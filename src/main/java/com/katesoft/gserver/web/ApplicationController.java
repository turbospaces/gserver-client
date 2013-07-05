package com.katesoft.gserver.web;

import com.katesoft.gserver.domain.UserAccount;
import com.katesoft.gserver.repo.UserAccountRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.inject.Inject;

import static java.lang.String.format;
import static org.springframework.util.StringUtils.capitalize;

@Controller
public class ApplicationController {
    private UserAccountRepository userAccountRepository;

    @Inject
    public ApplicationController(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }
    @RequestMapping(value="/signin", method=RequestMethod.GET)
    public void signin() {}

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String signup(SignupForm form, BindingResult formBinding, WebRequest request) {
        if (formBinding.hasErrors()) {
            return null;
        }

        UserAccount account = new UserAccount(form);
        boolean created = userAccountRepository.createUserAccount(account);
        if (!created) {
            formBinding.rejectValue("username", "user.duplicateUsername");
            return null;
        }

        User user = account.toUserDetails();
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities())
        );
        ProviderSignInUtils.handlePostSignUp(account.getUserName(), request);
        return "redirect:/";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public SignupForm signupForm(WebRequest request) {
        Connection<?> connection = ProviderSignInUtils.getConnection(request);
        if (connection != null) {
            request.setAttribute("message",
                    format("Your %s account is not associated with application, please sign up", capitalize(connection.getKey().getProviderId())),
                    WebRequest.SCOPE_REQUEST);
            request.setAttribute("social_provider", connection.getKey().getProviderId(), WebRequest.SCOPE_REQUEST);
            return SignupForm.fromProviderUser(connection);
        } else {
            return new SignupForm();
        }
    }

    @RequestMapping("/")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("home");
        //model.addAttribute("connectionsToProviders", getConnectionRepository().findAllConnections());
        //model.addAttribute(accountRepository.findAccountByUsername(currentUser.getName()));
        return mv;
    }
}

