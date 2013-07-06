<%@ page session="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<div class="row-fluid">
    <div class="span4"></div>
    <div class="span4 well">
        <c:if test="${param.error eq 'bad_credentials'}">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <div class="alert alert-error">
                Your sign in information was incorrect.
                Please try again or <a href="<c:url value="/signup" />">Sign Up</a>.
            </div>
        </c:if>

        <div class="row-fluid">
            <div class="span6">
                <p class="lead">Sign in with credentials</p>

                <form id="signinForm" action="<c:url value="/signin/authenticate" />" method="post">
                    <input id="tbLogin"
                           name="j_username"
                           placeholder="Username Or Email"
                           type="text"
                           maxlength="50"
                           class="input-block-level"
                           required="required"/>
                    <input id="tbPassword"
                           name="j_password"
                           placeholder="Password"
                           type="password"
                           maxlength="50"
                           class="input-block-level"
                           required="required"/>

                    <label class="checkbox">
                        <input id="cbRememberMe"
                               type="checkbox"
                               class="input-block-level"
                               name="_spring_security_remember_me">
                        <span class="label label-warning">Remember me</span></label>
                    <button type="submit" class="btn btn-info btn-block">Sign In</button>
                </form>
            </div>
            <div class="span6">
                <p class="lead">Or sign in with social</p>

                <form method="post" id="socialSigninForm">
                    <button type="submit" class="btn btn-block" id="btnSigninFacebook">
                        <img src="<c:url value="/resources/social/sign-in-with-facebook.png"/>"/>
                    </button>
                    <button type="submit" class="btn btn-block" id="btnSigninTwitter">
                        <img src="<c:url value="/resources/social/sign-in-with-twitter.png"/>"/>
                    </button>
                </form>
            </div>
        </div>
    </div>
    <div class="span4"></div>
</div>

<script type="text/javascript">
    $(document).ready(function () {
        var socials = ['Facebook','Twitter'];
        var socialUrls = ['<c:url value="/signin/facebook"/>', '<c:url value="/signin/twitter"/>'];

        for (var i = 0; i < socials.length; i++) {
            var provider = socials[i];
            var selector = '#btnSignin' + provider;
            $(selector).click((function (url) {
                return function (e) {

                    e.preventDefault();
                    $('#socialSigninForm').attr('action', url).submit();
                }
            })(socialUrls[i]));
        }
    });
</script>