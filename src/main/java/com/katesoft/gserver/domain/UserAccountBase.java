package com.katesoft.gserver.domain;

import java.io.Serializable;

public abstract class UserAccountBase implements Serializable {
    private String provider, providerUserId;

    private String userName;
    private String firstName, lastName;
    private String password;
    private String email;

    public UserAccountBase() {
    }

    protected UserAccountBase(UserAccountBase accountBase) {
        setUserName(accountBase.getUserName());
        setFirstName(accountBase.getFirstName());
        setLastName(accountBase.getLastName());
        setPassword(accountBase.getPassword());
        setEmail(accountBase.getEmail());
        setProvider(accountBase.getProvider());
        setProviderUserId(accountBase.getProviderUserId());
    }

    public String getProvider() {
        return provider;
    }

    public String getProviderUserId() {
        return providerUserId;
    }

    public String getUserName() {
        return userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public void setProviderUserId(String providerUserId) {
        this.providerUserId = providerUserId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
