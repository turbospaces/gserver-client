<%@ page session="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<c:url value="/signup" var="signupUrl"/>
<div class="row-fluid">
    <div class="span4"></div>
    <div class="span4 well">
        <c:if test="${not empty message}">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <div class="alert alert-info">${message}</div>
        </c:if>
        <div>
            <form:form id="signup" action="${signupUrl}" method="post" modelAttribute="signupForm" cssClass="form-horizontal">
                <div class="control-group">
                    <label class="control-label" for="tbUserName">Username:</label>
                    <div class="controls"><form:input path="username" type="text" id="tbUserName"/></div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="tbFirstName">First Name:</label>

                    <div class="controls"><form:input path="firstname" id="tbFirstName"/></div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="tbLastName">Last Name:</label>
                    <div class="controls"><form:input path="lastname" id="tbLastName"/></div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="tbEmail">Email:</label>
                    <div class="controls"><form:input path="email" id="tbEmail"/></div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="tbPassword">Password:</label>
                    <div class="controls"><form:password path="password" id="tbPassword"/></div>
                </div>
                <form:hidden path="provider" />
                <form:hidden path="providerUserId" />
                <div class="control-group">
                    <div class="controls"><button type="submit" class="btn btn-primary">Sign Up</button></div>
                </div>
            </form:form>
        </div>
    </div>
    <div class="span4"></div>
</div>