<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:url value="/async/get-ws-url" var="getWSUrl" scope="request"/>
<c:url value="/signin/authenticate" var="authenticateUrl" scope="request"/>
<c:url value="/signup" var="signupUrl" scope="request"/>
<c:url value="/signin" var="signinUrl" scope="request"/>
<c:url value="/signout" var="signoutUrl" scope="request"/>
<c:url value="/signin/facebook" var="signinFacebookUrl" scope="request"/>
<c:url value="/signin/twitter" var="signinTwitterUrl" scope="request"/>