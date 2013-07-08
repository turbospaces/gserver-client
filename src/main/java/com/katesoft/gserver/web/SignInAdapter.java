package com.katesoft.gserver.web;

import com.katesoft.gserver.domain.DomainRepository;
import com.katesoft.gserver.domain.UserAccount;
import com.katesoft.gserver.repo.UserAccountRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.social.connect.Connection;
import org.springframework.web.context.request.NativeWebRequest;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SignInAdapter implements org.springframework.social.connect.web.SignInAdapter {
    private RequestCache requestCache;
    private DomainRepository repository;

    @Inject
    public SignInAdapter(RequestCache requestCache, DomainRepository repository) {
        this.requestCache = requestCache;
        this.repository = repository;
    }

    @Override
    public String signIn(String userId, Connection<?> connection, NativeWebRequest request) {
        UserAccount account = repository.loadUserByUsername(userId);
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(account, account.getPassword(), account.getAuthorities())
        );

        HttpServletRequest nativeReq = request.getNativeRequest(HttpServletRequest.class);
        HttpServletResponse nativeRes = request.getNativeResponse(HttpServletResponse.class);

        SavedRequest saved = requestCache.getRequest(nativeReq, nativeRes);
        if (saved == null) {
            return null;
        }
        requestCache.removeRequest(nativeReq, nativeRes);
        HttpSession session = nativeReq.getSession(false);
        if (session != null) {
            session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
        }
        return saved.getRedirectUrl();
    }
}
