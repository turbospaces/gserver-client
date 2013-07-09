package com.katesoft.gserver.web;

import org.springframework.security.crypto.codec.Base64;
import org.springframework.security.web.authentication.rememberme.InvalidCookieException;
import org.springframework.util.StringUtils;

import java.util.Arrays;

/**
 * Created with IntelliJ IDEA.
 * User: andrey
 * Date: 7/9/13
 * Time: 9:45 PM
 * To change this template use File | Settings | File Templates.
 */
public class Main {
    public static void main(String[] args) {
        String cookieValue = "SGlGakZWb1g1RkZTaUVFMWpZWlJOQT09OnBiZE0zay96azUvYkdISzBNRGhTM1E9PQ";
        for (int j = 0; j < cookieValue.length() % 4; j++) {
            cookieValue = cookieValue + "=";
        }

        if (!Base64.isBase64(cookieValue.getBytes())) {
            throw new InvalidCookieException( "Cookie token was not Base64 encoded; value was '" + cookieValue + "'");
        }

        String cookieAsPlainText = new String(Base64.decode(cookieValue.getBytes()));
        String[] tokens = StringUtils.delimitedListToStringArray(cookieAsPlainText, ":");
        System.out.println(Arrays.toString(tokens));
    }
}
