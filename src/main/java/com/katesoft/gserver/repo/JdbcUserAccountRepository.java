package com.katesoft.gserver.repo;

import com.google.common.base.Optional;
import com.katesoft.gserver.domain.UserAccount;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.inject.Inject;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JdbcUserAccountRepository implements UserAccountRepository {
    private Logger logger = LoggerFactory.getLogger(getClass());
    private JdbcTemplate jdbcTemplate;
    private PasswordEncoder passwordEncoder;

    @Inject
    public JdbcUserAccountRepository(JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = jdbcTemplate;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean createUserAccount(UserAccount account) {
        try {
            return jdbcTemplate.update(
                    "insert into Account (first_name, last_name, user_name, password, email, provider, provider_user_id) values (?, ?, ?, ?, ?, ?, ?)",
                    account.getFirstName(),
                    account.getLastName(),
                    account.getUserName().trim(),
                    passwordEncoder.encode(account.getPassword().trim()),
                    account.getEmail().trim(),
                    account.getProvider(),
                    account.getProviderUserId()
            ) > 0;
        } catch (DuplicateKeyException e) {
            logger.error(e.getMessage(), e);
            return false;
        }
    }

    @Override
    public Optional<UserAccount> findAccountByUsernameOrEmail(String usernameOrEmail) {
        return Optional.fromNullable(jdbcTemplate.queryForObject(
                "select user_name, first_name, last_name, email, password, provider, provider_user_id from Account where user_name = ?",
                new RowMapper<UserAccount>() {
                    public UserAccount mapRow(ResultSet rs, int rowNum) throws SQLException {
                        UserAccount account = new UserAccount();

                        account.setUserName(rs.getString("user_name"));
                        account.setFirstName(rs.getString("first_name"));
                        account.setLastName(rs.getString("last_name"));
                        account.setEmail(rs.getString("email"));
                        account.setPassword(rs.getString("password"));
                        account.setProvider(rs.getString("provider"));
                        account.setProviderUserId(rs.getString("provider_user_id"));

                        return account;
                    }
                }, usernameOrEmail));
    }
}
