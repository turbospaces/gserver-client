<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@ page session="false" %>


<script src="<c:url value="/resources/js/application.js" />"></script>
<script src="<c:url value="/resources/js/transport/transport.js" />"></script>

<security:authorize access="isAuthenticated()">
    <script type="text/javascript">
        var serverURL = '${pageContext.request.localName}' + ":8190";
        ui.transport.init(serverURL);
    </script>
</security:authorize>
