package com.katesoft.gserver.web;

import com.katesoft.gserver.domain.UserAccountBase;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.UserProfile;

public class SignupForm extends UserAccountBase {
    public static SignupForm fromProviderUser(Connection<?> connection) {
        UserProfile userProfile = connection.fetchUserProfile();
        SignupForm form = new SignupForm();

        form.setUsername(userProfile.getUsername());
        form.setFirstname(userProfile.getFirstName());
        form.setLastname(userProfile.getLastName());
        form.setEmail(userProfile.getEmail());
        form.setProvider(connection.getKey().getProviderId());
        form.setProviderUserId(connection.getKey().getProviderUserId());

        return form;
    }
}
