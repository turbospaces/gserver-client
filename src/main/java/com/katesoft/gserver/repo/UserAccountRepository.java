package com.katesoft.gserver.repo;

import com.google.common.base.Optional;
import com.katesoft.gserver.domain.UserAccount;

public interface UserAccountRepository {
    /**
     * create new user account if possible.
     *
     * @param account - user account.
     * @return true if the user account being created and no constraints violated, otherwise false (meaning that the
     *         user already exists).
     */
    boolean createUserAccount(UserAccount account);
    Optional<UserAccount> findAccountByUsernameOrEmail(String usernameOrEmail);
}
