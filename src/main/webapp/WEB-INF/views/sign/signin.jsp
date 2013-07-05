<%@ page session="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<div class="row-fluid">
    <div class="span3"></div>
    <div class="span6 well">
        <c:if test="${param.error eq 'bad_credentials'}">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <div class="alert alert-error">
                Your sign in information was incorrect.
                Please try again or <a href="<c:url value="/signup" />">Sign Up</a>.
            </div>
        </c:if>

        <form id="signinForm" action="<c:url value="/signin/authenticate" />" method="post">
            <fieldset>
                <input id="tbLogin"
                       name="j_username"
                       placeholder="Username Or Email"
                       type="text"
                       size="50"
                       required="required"
                       class="span4"/>
                <input id="tbPassword"
                       name="j_password"
                       placeholder="Password"
                       type="password"
                       size="50"
                       required="required"
                       class="span4"/>
                <label class="checkbox">
                    <input id="cbRememberMe"
                           type="checkbox"
                           name="_spring_security_remember_me">Remember me</label>
            </fieldset>
            <div class="btn-group">
                <button type="submit" class="btn btn-info">Sign In</button>
                <button class="btn dropdown-toggle" data-toggle="dropdown">
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="<c:url value="/signin/facebook"/>"><img src="<c:url value="/resources/social/sign-in-with-facebook.png"/>"/></a></li>
                    <li><a href="<c:url value="/signin/twitter"/>"><img src="<c:url value="/resources/social/sign-in-with-twitter-d.png"/>"/></a></li>
                </ul>
            </div>
        </form>
    </div>
    <div class="span3"></div>
</div>