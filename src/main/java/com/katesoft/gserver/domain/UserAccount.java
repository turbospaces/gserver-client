package com.katesoft.gserver.domain;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import static java.util.Collections.singleton;

public class UserAccount extends UserAccountBase {
    public UserAccount() {}
    public UserAccount(UserAccountBase accountBase) {
        super(accountBase);
    }
    public User toUserDetails() {
        return new User(getUserName(), getPassword(), singleton(new SimpleGrantedAuthority("ROLE_USER")));
    }
}

