<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@ page session="false" %>

<security:authorize access="isAuthenticated()">
    <script type="text/javascript">
        $.getJSON('${getWSUrl}', function (wsToken) {
            sessvars.ui.transport.init(wsToken);
        });
    </script>
</security:authorize>
