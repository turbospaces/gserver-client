<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles-extras" prefix="tilesx" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@ taglib uri="http://www.springframework.org/spring-social/social/tags" prefix="social" %>

<%@ include file="urls.jsp"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" class="fuelux">
<head>
    <title><tiles:insertAttribute name="title"/></title>
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
    <link href="<c:url value="/resources/css/bootstrap.css" />" rel="stylesheet" media="screen"/>
    <link href="<c:url value="/resources/css/bootstrap-combobox.css" />" rel="stylesheet" media="screen"/>
    <link href="<c:url value="/resources/css/jquery.pnotify.default.css" />" rel="stylesheet" media="screen"/>

    <tilesx:useAttribute id="styles" name="styles" classname="java.util.List" ignore="true"/>
    <c:forEach var="cssName" items="${styles}">
        <link type="text/css" href="<c:url value="/resources/css/${cssName}"/>" rel="stylesheet" media="screen"/>
    </c:forEach>

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body>
<script src="<c:url value="/resources/js/jquery.min.js" />"></script>
<script src="<c:url value="/resources/js/jquery.pnotify.min.js" />"></script>
<script src="<c:url value="/resources/js/bootstrap.min.js" />"></script>
<script src="<c:url value="/resources/js/bootstrap-combobox.js" />"></script>
<script src="<c:url value="/resources/js/sessvars.js" />"></script>

<tilesx:useAttribute id="scripts" name="scripts" classname="java.util.List" ignore="true"/>
<c:forEach var="jsPath" items="${scripts}">
    <script src="<c:url value="/resources/js/${jsPath}" />"></script>
</c:forEach>

<tiles:insertAttribute name="header"/>
<tiles:insertAttribute name="body"/>
<tiles:insertAttribute name="footer"/>
</body>
</html>