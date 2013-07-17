<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<c:set var="game" value="${param.id}" scope="request"/>

<script src="<c:url value="/resources/js/json2.js" />"></script>
<script src="<c:url value="/resources/js/kinetic.min.js" />"></script>

<div class="row-fluid">
    <div class="span3"></div>
    <div class="span6" id="gameContainer" style="border: 1px coral solid;"></div>
    <div class="span3"></div>
</div>
<div class="row-fluid">
    <div class="span3"></div>
    <div class="span6" id="controlsContainer">
        <div class="row-fluid">
            <div class="span2">
                <button class="btn btn-info btn-block">Auto</button>
            </div>
            <div class="span2">
                <button class="btn btn-inverse btn-block">Undo</button>
            </div>
            <div class="span2">
                <button class="btn btn-danger btn-block">Clear</button>
            </div>
            <div class="span2">
                <button class="btn btn-success btn-block">Rebet</button>
            </div>
            <div class="span2">
                <button class="btn btn-warning btn-block">Double</button>
            </div>
            <div class="span2">
                <button class="btn btn-primary btn-block">Spin</button>
            </div>
        </div>
    </div>
    <div class="span3"></div>
</div>

<security:authorize access="isAuthenticated()">
    <script src="<c:url value="/resources/js/application.js" />"></script>
    <script src="<c:url value="/resources/js/transport.js" />"></script>
    <script src="<c:url value="/resources/js/games/${game}.js" />"></script>
    <script type="text/javascript">
        $.getJSON('${getWSUrl}', function (wsToken) {
            var transport = new Transport(wsToken);
            var game = "${game}";
            setTimeout(function () {
                if (transport.ws.readyState == 0) {
                    console.warn('still waiting for web-socket connect');
                }
                if (transport.ws.readyState == 1) {
                    transport.login(wsToken);
                    var openGamePlayPromise = transport.openGamePlay(game).done(function (reply) {
                        console.debug("GamePlay session=%s has been created=%s", sessvars.ui.sessionId, JSON.stringify(sessvars.ui.game));
                        console.debug("Loading Game=%s", game);
                        loadGame({x: 0, y: 0}, transport);
                    });
                    $.when(openGamePlayPromise).then(function(reply){});
                }
            }, 250);
        });
    </script>
</security:authorize>