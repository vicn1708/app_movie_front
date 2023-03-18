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
var mountAlert = function () {
    var alert = document.querySelector("#alert");
    if (alert.style.display === "block") {
        setTimeout(function () {
            alert.style.animation = "unMountAlert 0.75s forwards";
            setTimeout(function () {
                alert.style.display = "none";
            }, 1000);
        }, 3000);
    }
};
var formCreateMovie = document.querySelector("#my__form_film");
formCreateMovie.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var category, title, cast, character, genre, trailer, description, poster, banner, categoryValue, titleValue, castValue, characterValue, genreValue, trailerValue, descriptionValue, posterValue, bannerValue, data, formDate, btnCreateMovie;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                category = document.getElementsByName("category");
                title = document.querySelector("#title");
                cast = document.querySelector("#cast");
                character = document.querySelector("#character");
                genre = document.querySelector("#genre");
                trailer = document.querySelector("#trailer");
                description = document.querySelector("#description");
                poster = document.querySelector("#poster_img");
                banner = document.querySelector("#banner_img");
                categoryValue = [];
                category.forEach(function (item) { return item.checked && categoryValue.push(item.value); });
                titleValue = title.value;
                castValue = cast.value;
                characterValue = character.value;
                genreValue = genre.value;
                trailerValue = trailer.value;
                descriptionValue = description.value;
                posterValue = poster.files[0];
                bannerValue = banner.files[0];
                if (posterValue == undefined || bannerValue == undefined) {
                    return [2 /*return*/, alert("file missing")];
                }
                if (categoryValue.length < 1 ||
                    titleValue == "" ||
                    castValue == "" ||
                    characterValue == "" ||
                    genreValue == "" ||
                    trailerValue == "" ||
                    descriptionValue == "") {
                    return [2 /*return*/, alert("field missing")];
                }
                data = {
                    title: titleValue,
                    categories: categoryValue,
                    casts: castValue.split(",").map(function (item) { return item.trim(); }),
                    characters: characterValue.split(",").map(function (item) { return item.trim(); }),
                    genres: genreValue.split(",").map(function (item) { return item.trim(); }),
                    trailer: trailerValue,
                    description: descriptionValue
                };
                console.log(data);
                formDate = new FormData();
                formDate.append("data", JSON.stringify(data));
                formDate.append("poster", posterValue);
                formDate.append("banner", bannerValue);
                btnCreateMovie = document.querySelector("#btn-create-movie");
                btnCreateMovie.innerHTML = "<img src=\"/images/btn-loading.svg\" alt=\"btn-loading\" class=\"w-max m-auto\"/>";
                return [4 /*yield*/, fetch("http://localhost:3000/admin/movie/create", {
                        method: "POST",
                        mode: "cors",
                        body: formDate
                    })
                        .then(function (res) {
                        if (res.ok) {
                            console.log("Image uploaded successfully");
                            btnCreateMovie.innerHTML = "Hoàn tất";
                            var alert_1 = document.querySelector("#alert");
                            alert_1.style.display = "block";
                            mountAlert();
                            return res.json();
                        }
                        else {
                            btnCreateMovie.innerHTML = "Hoàn tất";
                            console.log("not handle");
                            return res.json();
                        }
                    })
                        .then(function (data) { return console.log(data); })["catch"](function (error) {
                        console.error("Error uploading image:", error);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
