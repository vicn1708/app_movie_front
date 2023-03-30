var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fetchPostOption = function (data) {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        keepalive: true,
        body: JSON.stringify(data)
    };
};
//* Toggle login
var toggleForm = "login";
document.querySelector("#username").parentElement.style.display = "none";
var toggleLogin = document.querySelector("#toggleLogin");
toggleLogin.addEventListener("click", function () {
    toggleForm === "login" ? (toggleForm = "register") : (toggleForm = "login");
    var titleLogin = document.querySelector("#titleLogin");
    var inputUsername = document.querySelector("#username");
    var btnLogin = document.querySelector("#btnLogin");
    var textToggleLogin = document.querySelector("#textToggleLogin");
    if (toggleForm == "register") {
        document.title = "Sign up";
        inputUsername.parentElement.style.display = "block";
        titleLogin.innerHTML = "Sign up";
        btnLogin.innerHTML = "Register";
        textToggleLogin.innerHTML = "Already have an account?";
        toggleLogin.innerHTML = "Login";
    }
    else {
        document.title = "Sign in";
        inputUsername.parentElement.style.display = "none";
        titleLogin.innerHTML = "Sign in";
        btnLogin.innerHTML = "Login";
        textToggleLogin.innerHTML = "Fisrt time using Neflix";
        toggleLogin.innerHTML = "Create an account";
    }
});
//* Submit form
var btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var username, email, password, data, fetchRegisterOption, account, data, fetchLoginOption, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = document.querySelector("#username");
                email = document.querySelector("#email");
                password = document.querySelector("#password");
                if (!(toggleForm === "register")) return [3 /*break*/, 2];
                if (!username.value || !email.value || !password.value) {
                    return [2 /*return*/, alert("not value")];
                }
                data = {
                    email: email.value,
                    username: username.value,
                    password: password.value
                };
                fetchRegisterOption = __assign({}, fetchPostOption(data));
                return [4 /*yield*/, fetch("http://localhost:3000/auth/register", fetchRegisterOption)
                        .then(function (response) { return response.json(); })
                        .then(function (data) {
                        var accessToken = data.access_token;
                        var refreshToken = data.refresh_token;
                        if (!accessToken && !refreshToken) {
                            return console.log(data);
                        }
                        var setTime10p = new Date(new Date().getTime() + 60 * 10).toUTCString();
                        var setTime30d = new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000).toUTCString();
                        document.cookie = "accessToken=".concat(accessToken, "; expires=").concat(setTime10p);
                        document.cookie = "refreshToken=".concat(refreshToken, "; expires=").concat(setTime30d);
                        location.reload();
                    })["catch"](function (error) {
                        console.error("Error:", error);
                    })];
            case 1:
                account = _a.sent();
                return [3 /*break*/, 4];
            case 2:
                if (!email.value || !password.value) {
                    return [2 /*return*/, alert("missing data field")];
                }
                data = {
                    email: email.value,
                    password: password.value
                };
                fetchLoginOption = __assign({}, fetchPostOption(data));
                return [4 /*yield*/, fetch("http://localhost:3000/auth/login", fetchLoginOption)
                        .then(function (response) { return response.json(); })
                        .then(function (data) {
                        if (data.status) {
                            return console.log(data);
                        }
                        var accessToken = data.access_token;
                        var refreshToken = data.refresh_token;
                        var setTime1h = new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString();
                        var setTime30d = new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000).toUTCString();
                        document.cookie = "accessToken=".concat(accessToken, "; expires=").concat(setTime1h);
                        document.cookie = "refreshToken=".concat(refreshToken, "; expires=").concat(setTime30d);
                        location.reload();
                    })["catch"](function (error) {
                        console.error("Error:", error);
                    })];
            case 3:
                user = _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
