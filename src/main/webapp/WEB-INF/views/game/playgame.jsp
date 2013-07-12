<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<c:set var="game" value="${param.id}" scope="request"/>

<script src="<c:url value="/resources/js/json2.js" />"></script>
<script src="<c:url value="/resources/js/kinetic.min.js" />"></script>

<div class="row-fluid">
    <div class="span2"></div>
    <div class="span8" id="gameContainer" style="border: 1px coral solid;"></div>
    <div class="span2"></div>
</div>

<security:authorize access="isAuthenticated()">
    <script src="<c:url value="/resources/js/application.js" />"></script>
    <script src="<c:url value="/resources/js/transport.js" />"></script>
    <script src="<c:url value="/resources/js/games/${game}.js" />"></script>
    <script type="text/javascript">
        $.getJSON('${getWSUrl}', function (wsToken) {
            var transport = new Transport(wsToken);
            setTimeout(function () {
                if (transport.ws.readyState == 0) {
                    console.warn('still waiting for web-socket connect');
                }
                if (transport.ws.readyState == 1) {
                    transport.openGamePlay("${game}");
                    loadGame({x: 0, y: 0});
                }
            }, 250);
        });
    </script>
</security:authorize>