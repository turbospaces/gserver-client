<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<div class="row-fluid">
    <div class="span2"></div>
    <div class="span8" id="gameContainer" style="border: 1px coral solid;"></div>
    <div class="span2">X</div>
</div>
<script src="<c:url value="/resources/js/transport/transport.js" />"></script>
<script src="<c:url value="/resources/js/games/roulette.js" />"></script>
<script defer="defer">
    var offset = {x: 0, y: - $("#mainNavBar").height()};
    loadRoulette(offset);
</script>