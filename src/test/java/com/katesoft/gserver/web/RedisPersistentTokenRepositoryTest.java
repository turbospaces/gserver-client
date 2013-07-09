package com.katesoft.gserver.web;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class RedisPersistentTokenRepositoryTest {
    JedisConnectionFactory cf;
    StringRedisTemplate template;
    RedisPersistentTokenRepository repo;

    @Before
    public void before() {
        cf = new JedisConnectionFactory();
        cf.afterPropertiesSet();

        template = new StringRedisTemplate(cf);
        template.afterPropertiesSet();
        template.execute(new RedisCallback<Void>() {
            @Override
            public Void doInRedis(RedisConnection connection) throws DataAccessException {
                connection.flushAll();
                return null;
            }
        });
        repo = new RedisPersistentTokenRepository(template);
    }

    @After
    public void after() {
        cf.destroy();
    }

    @Test
    public void works() {
        PersistentRememberMeToken token1 = new PersistentRememberMeToken("gserver", "series1", "token-value1", new Date());
        PersistentRememberMeToken token2 = new PersistentRememberMeToken("gserver", "series2", "token-value2", new Date());
        repo.createNewToken(token1);
        repo.createNewToken(token2);
        PersistentRememberMeToken clone1 = repo.getTokenForSeries("series1");
        PersistentRememberMeToken clone2 = repo.getTokenForSeries("series2");

        assertTrue(EqualsBuilder.reflectionEquals(token1, clone1, false));
        assertTrue(EqualsBuilder.reflectionEquals(token2, clone2, false));

        repo.updateToken("series2", "token-value2-updated", new Date());
        clone2 = repo.getTokenForSeries("series2");

        assertEquals("token-value2-updated", clone2.getTokenValue());

        repo.removeUserTokens("gserver");

        assertTrue(repo.getTokenForSeries("series1") == null);
        assertTrue(repo.getTokenForSeries("series2") == null);
    }
}
