package com.katesoft.gserver.web;

import com.google.common.base.Predicate;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Iterables;
import com.katesoft.gserver.domain.GameBO;
import com.katesoft.gserver.domain.RedisDomainRepository;
import com.katesoft.gserver.domain.UserAccountBO;
import com.katesoft.gserver.domain.WebsocketLoginToken;
import com.katesoft.gserver.domain.support.RedisPersistentTokenBasedRememberMeServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

import static java.lang.String.format;
import static org.springframework.util.StringUtils.capitalize;

@Controller
public class ApplicationController {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final RedisDomainRepository repository;
    private final RedisPersistentTokenBasedRememberMeServices rememberMeServices;

    @Inject
    public ApplicationController(RedisDomainRepository repository, RedisPersistentTokenBasedRememberMeServices rememberMeServices) {
        this.repository = repository;
        this.rememberMeServices = rememberMeServices;
    }

    @RequestMapping(value = "/signin", method = RequestMethod.GET)
    public void signin() {
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String signup(SignupForm form, BindingResult formBinding, WebRequest request) {
        if (formBinding.hasErrors()) {
            return null;
        }

        UserAccountBO account = new UserAccountBO(form);
        try {
            repository.saveUserAccount(account);
        } catch (DuplicateKeyException e) {
            logger.error(e.getMessage(), e);
            formBinding.rejectValue("username", "user.duplicateUsername");
            return null;
        }

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(account, account.getPassword(), account.getAuthorities()));
        ProviderSignInUtils.handlePostSignUp(account.getUsername(), request);
        return "redirect:/";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public SignupForm signupForm(WebRequest request) {
        Connection<?> connection = ProviderSignInUtils.getConnection(request);
        if (connection != null) {
            request
                    .setAttribute(
                            "message",
                            format("Your %s account is not associated with application, please sign up", capitalize(connection
                                    .getKey()
                                    .getProviderId())),
                            RequestAttributes.SCOPE_REQUEST);
            request.setAttribute("social_provider", connection.getKey().getProviderId(), RequestAttributes.SCOPE_REQUEST);
            return SignupForm.fromProviderUser(connection);
        } else {
            return new SignupForm();
        }
    }

    @RequestMapping(value = "/async/get-ws-url", method = RequestMethod.GET)
    public
    @ResponseBody
    WebsocketLoginToken getWebsocketsUrl(HttpServletRequest request) {
        final Cookie[] cookies = request.getCookies();
        final String cookieName = rememberMeServices.getCookieName();
        Cookie cookie = Iterables.find(Arrays.asList(cookies), new Predicate<Cookie>() {
            @Override
            public boolean apply(Cookie input) {
                return input.getName().equals(cookieName);
            }
        });
        WebsocketLoginToken t = rememberMeServices.encodeWebsocketLoginToken(cookie.getValue());
        t.setUrl("ws://localhost:8190/websockets");
        return t;
    }

    @RequestMapping("/")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("home");
        ImmutableSet<GameBO> allGames = repository.findAllGames();
        mv.addObject("games", allGames);
        return mv;
    }

    @RequestMapping(value = "/playgame", method = RequestMethod.GET)
    public ModelAndView playGame(@RequestParam String id) {
        ModelAndView mv = new ModelAndView("playgame");
        GameBO gameBO = repository.findGame(id).get();
        mv.addObject("game", gameBO);
        return mv;
    }
}
