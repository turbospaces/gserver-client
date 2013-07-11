<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>

<div class="navbar" id="mainNavBar">
    <div class="navbar-inner">
        <div class="container">
            <ul class="nav pull-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Games<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <c:forEach var="game" items="${games}">
                            <c:url var="playUrl" value="/playgame">
                                <c:param name="id" value="${game.primaryKey}" />
                            </c:url>
                            <li><a href="${playUrl}">${game.displayName}</a></li>
                        </c:forEach>
                    </ul>
                </li>
                <security:authorize access="isAuthenticated()">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <security:authentication property="principal.username"/><b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#settingsModal" data-toggle="modal">Settings</a></li>
                            <li><a href="${signoutUrl}">Sign Out</a></li>
                        </ul>
                    </li>
                </security:authorize>
                <security:authorize access="isAnonymous()">
                    <li><a href="${signinUrl}">Sign In</a></li>
                 </security:authorize>
            </ul>
        </div>
    </div>
</div>

<div id="settingsModal" class="modal hide fade">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3>Player Setting</h3>
    </div>
    <div class="modal-body">
        <form class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="displayName">Display Name</label>
                <div class="controls"><input type="text" id="displayName" required="required"></div>
            </div>
            <div class="control-group">
                <label class="control-label" for="cbCurrency">Currency</label>
                <div class="controls">
                    <select class="combobox" required="required" id="cbCurrency">
                        <option value="">Choose a currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                    </select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="cbLanguage">Language</label>
                <div class="controls">
                    <select class="combobox" required="required" id="cbLanguage">
                        <option value="">Choose a Language</option>
                        <option value="en">English</option>
                        <option value="ru">Russian</option>
                        <option value="uk">Ukrainian</option>
                        <option value="de">German</option>
                        <option value="fr">French</option>
                        <option value="it">Italian</option>
                    </select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="disableMusicCheckbox">Music</label>
                <div class="controls">
                    <label class="checkbox"><input type="checkbox" id="disableMusicCheckbox">Disable music content</label>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="disableBgMusicCheckbox">Background Music</label>
                <div class="controls">
                    <label class="checkbox"><input type="checkbox" id="disableBgMusicCheckbox">Disable background effects content</label>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <a class="btn btn-inverse" data-dismiss="modal">Close</a>
        <a class="btn btn-primary">Save</a>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function () {
        $('#cbCurrency').combobox();
        $('#cbLanguage').combobox();
    });
</script>