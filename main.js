Game.registerMod("MinecraftClicker", {
    init: function() {
        Game.Notify(`Welcome to Minecraft Clicker!`, `The mod loading is complete.`, [16, 5, this.dir + '/img/modicon.png']);
        Game.Notify(`This was compiled and rewrote by Jacob Pierce`, `Enjoy and have fun`);

        const MOD = this;
        const dir = this.dir || '';

        // Флаги включения функций (по умолчанию включены)
        this.minecraftMusicEnabled = true;
        this.cookieStyle = 'minecraft'; // 'minecraft' или 'creeper'
        this.cursorEnabled = true;
        this.useMinecraftBackgrounds = true;
        this.useMinecraftWrinklers = true; // Новый флаг для wrinkler-ресурсов
        this.useMinecraftIcons = true; // Новый флаг для иконок
        this.useMinecraftBuildings = true; // Новый флаг для зданий
        this.useFarmBackground = false; // Новый флаг для замены всех фонов на bgfarm.jpg

        // Объект с файлами фонов (Minecraft и оригинальные)
        this.backgroundFiles = {
            bgBlue: { minecraft: dir + '/bgbluewool.jpg', original: 'bgBlue.jpg' },
            bgPurple: { minecraft: dir + '/bgpurplewool.jpg', original: 'bgPurple.jpg' },
            bgRed: { minecraft: dir + '/bgredwool.jpg', original: 'bgRed.jpg' },
            bgPink: { minecraft: dir + '/bgpinkwool.jpg', original: 'bgPink.jpg' },
            bgMint: { minecraft: dir + '/bggreenwool.jpg', original: 'bgMint.jpg' },
            bgWhite: { minecraft: dir + '/bgWhite.jpg', original: 'bgWhite.jpg' },
            bgBlack: { minecraft: dir + '/bgblackwool.jpg', original: 'bgBlack.jpg' },
            bgBW: { minecraft: dir + '/bgBW.jpg', original: 'bgBW.jpg' },
            bgSilver: { minecraft: dir + '/bgSilver.jpg', original: 'bgSilver.jpg' },
            bgGold: { minecraft: dir + '/bgGold.jpg', original: 'bgGold.jpg' },
            bgYellowBlue: { minecraft: dir + '/bgYellowBlue.jpg', original: 'bgYellowBlue.jpg' },
            bgMoney: { minecraft: dir + '/bgMoney.jpg', original: 'bgMoney.jpg' },
            bgChoco: { minecraft: dir + '/bgChoco.jpg', original: 'bgChoco.jpg' },
            bgChocoDark: { minecraft: dir + '/bgChocoDark.jpg', original: 'bgChocoDark.jpg' },
            bgSky: { minecraft: dir + '/bgSky.jpg', original: 'bgSky.jpg' },
            bgCandy: { minecraft: dir + '/bgCandy.jpg', original: 'bgCandy.jpg' },
            bgPaint: { minecraft: dir + '/bgPaint.jpg', original: 'bgPaint.jpg' },
            bgFoil: { minecraft: dir + '/bgFoil.jpg', original: 'bgFoil.jpg' },
            bgStars: { minecraft: dir + '/bgStars.jpg', original: 'bgStars.jpg' },
            bgSpectrum: { minecraft: dir + '/bgSpectrum.jpg', original: 'bgSpectrum.jpg' },
            grandmas1: { minecraft: dir + '/grandmas1.jpg', original: 'grandmas1.jpg' },
            grandmas2: { minecraft: dir + '/grandmas2.jpg', original: 'grandmas2.jpg' },
            grandmas3: { minecraft: dir + '/grandmas3.jpg', original: 'grandmas3.jpg' },
            bgSnowy: { minecraft: dir + '/bgSnowy.jpg', original: 'bgSnowy.jpg' }
        };

        // Объект с файлами wrinkler-ресурсов (Minecraft и оригинальные)
        this.wrinklerFiles = {
            shinyWrinkler: { minecraft: dir + '/shinyWrinkler.png', original: 'shinyWrinkler.png' },
            shinyWrinklerBits: { minecraft: dir + '/shinyWrinklerBits.png', original: 'shinyWrinklerBits.png' },
            winterWinkler: { minecraft: dir + '/winterWinkler.png', original: 'winterWinkler.png' },
            winterWrinkler: { minecraft: dir + '/winterWrinkler.png', original: 'winterWrinkler.png' },
            wrinkler: { minecraft: dir + '/wrinkler.png', original: 'wrinkler.png' },
            wrinklerBits: { minecraft: dir + '/wrinklerBits.png', original: 'wrinklerBits.png' },
            wrinklerBitsOld: { minecraft: dir + '/fixiesBits.png', original: 'wrinklerBitsOld.png' },
            wrinklerBlink: { minecraft: dir + '/wrinklerBlink.png', original: 'wrinklerBlink.png' },
            wrinklerGooglies: { minecraft: dir + '/wrinklerGooglies.png', original: 'wrinklerGooglies.png' },
            wrinklerShadow: { minecraft: dir + '/wrinklerShadow.png', original: 'wrinklerShadow.png' }
        };

        // Функция обновления стиля фонов (Minecraft, оригинал или ферма)
        this.updateBackgroundStyle = function() {
            if (this.useFarmBackground) {
                // Заменяем все фоны на bgfarm.jpg
                const farmBg = dir + '/bgfarm.jpg';
                for (let key in this.backgroundFiles) {
                    Game.Loader.Replace(key + '.jpg', farmBg);
                }
            } else {
                let source = this.useMinecraftBackgrounds ? 'minecraft' : 'original';
                for (let key in this.backgroundFiles) {
                    Game.Loader.Replace(key + '.jpg', this.backgroundFiles[key][source]);
                }
            }
        };

        // Функция обновления wrinkler-ресурсов (Minecraft или оригинал)
        this.updateWrinklerStyle = function() {
            let source = this.useMinecraftWrinklers ? 'minecraft' : 'original';
            for (let key in this.wrinklerFiles) {
                Game.Loader.Replace(key + '.png', this.wrinklerFiles[key][source]);
            }
        };

        // Функция обновления изображений печенья в зависимости от стиля
        this.updateCookieStyle = function() {
            if (this.cookieStyle === 'minecraft') {
                // Minecraft-стиль печенья
                Game.Loader.Replace('perfectCookie.png', dir + '/MinecraftCookie.png');
                Game.Loader.Replace('cookieShadow.png', dir + '/MinecraftCookieShadow.png');

                Game.Loader.Replace('cookieShower1.png', dir + '/cookieShower1.png');
                Game.Loader.Replace('cookieShower2.png', dir + '/cookieShower2.png');
                Game.Loader.Replace('cookieShower3.png', dir + '/cookieShower3.png');

                // Minecraft версии специальных печений
                Game.Loader.Replace('imperfectCookie.png', dir + '/MinecraftImperfectCookie.png');
                Game.Loader.Replace('wrathCookie.png', dir + '/MinecraftWrathCookie.png');
                Game.Loader.Replace('goldCookie.png', dir + '/MinecraftGoldCookie.png');
                Game.Loader.Replace('spookyCookie.png', dir + '/MinecraftSpookyCookie.png');

            } else if (this.cookieStyle === 'creeper') {
                // Creeper-стиль печенья
                Game.Loader.Replace('perfectCookie.png', dir + '/CookieCreeper.png');
                Game.Loader.Replace('cookieShadow.png', dir + '/CookieCreeperShadow.png');

                Game.Loader.Replace('cookieShower1.png', 'cookieShower1.png');
                Game.Loader.Replace('cookieShower2.png', 'cookieShower2.png');
                Game.Loader.Replace('cookieShower3.png', 'cookieShower3.png');

                // Оригинальные версии специальных печений (не Minecraft)
                Game.Loader.Replace('imperfectCookie.png', 'imperfectCookie.png');
                Game.Loader.Replace('wrathCookie.png', 'wrathCookie.png');
                Game.Loader.Replace('goldCookie.png', 'goldCookie.png');
                Game.Loader.Replace('spookyCookie.png', 'spookyCookie.png');
            }
        };

        // Функция переключения музыки между оригинальной и Minecraft
        this.updateMusic = function() {
            if (this.minecraftMusicEnabled) {
                Music.tracks['preclick'].audio.src = dir + '/music/preclick.mp3';
                Music.tracks['click'].audio.src = dir + '/music/click.mp3';
                Music.tracks['ascend'].audio.src = dir + '/music/ascend.mp3';
                Music.tracks['grandmapocalypse'].audio.src = dir + '/music/grandmapocalypse.mp3';
            } else {
                Music.tracks['preclick'].audio.src = 'music/preclick.mp3';
                Music.tracks['click'].audio.src = 'music/click.mp3';
                Music.tracks['ascend'].audio.src = 'music/ascend.mp3';
                Music.tracks['grandmapocalypse'].audio.src = 'music/grandmapocalypse.mp3';
            }

            const currentTrack = Music.currentTrack;
            if (currentTrack && Music.tracks[currentTrack]) {
                const audio = Music.tracks[currentTrack].audio;
                audio.pause();
                audio.currentTime = 0;
                audio.load();
                const onCanPlay = () => {
                    audio.removeEventListener('canplay', onCanPlay);
                    if (MOD.minecraftMusicEnabled && Music.playing) {
                        audio.play().catch(e => console.warn('Audio play failed:', e));
                    }
                };
                audio.addEventListener('canplay', onCanPlay, { once: true });
            }
        };

        // Функция переключения курсора между Minecraft и оригинальным
        this.updateCursor = function() {
            if (this.cursorEnabled) {
                Game.Loader.Replace('cursor.png', dir + '/Minecraftcursor.png');
            } else {
                Game.Loader.Replace('cursor.png', 'cursor.png');
            }
        };

        // Функция обновления иконок (переключение между icons_orig и icons)
        this.updateIconsStyle = function() {
            if (this.useMinecraftIcons) {
                // Minecraft-стиль — icons.png
                Game.Loader.Replace('icons.png', dir + '/img/icons.png');
            } else {
                // Оригинальный стиль — icons_orig.png
                Game.Loader.Replace('icons.png', dir + '/img/icons_orig.png');
            }
            this.updateCSS(); // Обновляем CSS после замены
        };

        // Функция обновления зданий (переключение между buildings_orig и buildings)
        this.updateBuildingsStyle = function() {
            if (this.useMinecraftBuildings) {
                // Minecraft-стиль — buildings.png
                Game.Loader.Replace('buildings.png', dir + '/img/buildings.png');
            } else {
                // Оригинальный стиль — buildings_orig.png
                Game.Loader.Replace('buildings.png', dir + '/img/buildings_orig.png');
            }
            this.updateCSS(); // Обновляем CSS после замены
        };

        // Функция обновления CSS для иконок и зданий (без удаления стиля)
        this.updateCSS = function() {
            if (!this.css_new) {
                this.css_new = document.createElement('style');
                document.head.appendChild(this.css_new);
            }
            const iconsUrl = this.useMinecraftIcons ? dir + '/img/icons.png' : dir + '/img/icons_orig.png';
            const buildingsUrl = this.useMinecraftBuildings ? dir + '/img/buildings.png' : dir + '/img/buildings_orig.png';
            this.css_new.textContent = 
                `.icon, body .icon, body .crate, body .usesIcon {background-image:url('${iconsUrl}');}` +
                `.product .icon,.product .icon.off,.tinyProductIcon{background-image:url('${buildingsUrl}');}`;
        };

        // Инициализация
        this.updateMusic();
        this.updateCookieStyle();
        this.updateCursor();
        this.updateBackgroundStyle();
        this.updateWrinklerStyle();
        this.updateIconsStyle(); // Инициализируем иконки
        this.updateBuildingsStyle(); // Инициализируем здания

        // Замена ресурсов (без фонов, wrinkler-ресурсов, иконок и зданий — они управляются функциями)
        Game.Loader.Replace('imperfectCookie.png', dir + '/MinecraftImperfectCookie.png');
        Game.Loader.Replace('wrathCookie.png', dir + '/MinecraftWrathCookie.png');
        Game.Loader.Replace('goldCookie.png', dir + '/MinecraftGoldCookie.png');
        Game.Loader.Replace('spookyCookie.png', dir + '/MinecraftSpookyCookie.png');
        Game.Loader.Replace('brokenCookie.png', dir + '/MinecraftBrokenCookie.png');
        Game.Loader.Replace('brokenCookieHalo.png', dir + '/MinecraftBrokenCookieHalo.png');
        Game.Loader.Replace('dashnetLogo.png', dir + '/dashnetLogo.png');

        Game.Loader.Replace('cookieShower1.png', dir + '/cookieShower1.png');
        Game.Loader.Replace('cookieShower2.png', dir + '/cookieShower2.png');
        Game.Loader.Replace('cookieShower3.png', dir + '/cookieShower3.png');

        // Переопределяем UpdateMenu для добавления переключателей (без удаления блока)
        let origUpdateMenu = Game.UpdateMenu;
        Game.UpdateMenu = function() {
            origUpdateMenu();

            if (Game.onMenu === 'prefs') {
                // Ищем существующий блок мода
                let settingsBlock = document.querySelector('#menu > .block[data-modBlock="true"]');
                if (!settingsBlock) {
                    // Если блока нет, создаем его
                    settingsBlock = document.createElement('div');
                    settingsBlock.className = 'block';
                    settingsBlock.style.padding = '0';
                    settingsBlock.style.margin = '-125px 4px';
                    settingsBlock.dataset.modBlock = 'true';
                    l('menu').appendChild(settingsBlock);
                }

                // Обновляем содержимое блока
                settingsBlock.innerHTML = `
                    <div class="subsection" style="padding: 0px;">
                        <div class="title">Minecraft Clicker Settings</div>
                        <br>
                        <a class="smallFancyButton prefButton option${MOD.minecraftMusicEnabled ? '' : ' off'}" style="margin: 0px 20px;" id="toggleMusic">
                            ${MOD.minecraftMusicEnabled ? 'Music: Minecraft' : 'Music: Cookie Clicker'}
                        </a>
                        <span style="font-size: 80%; color: #ccc;">
                            &nbsp;Selects whether to play music from Minecraft or Cookie Clicker. (If you change the song type, you'll have to re-enable it in the jukebox.)
                        </span>
                        <br><br>
                        <a class="smallFancyButton prefButton option${MOD.cookieStyle === 'minecraft' ? '' : ' off'}" style="margin: 0px 20px;" id="toggleCookieStyle">
                            ${MOD.cookieStyle === 'minecraft' ? 'Cookie Style: Minecraft' : 'Cookie Style: Creeper'}
                        </a>
                        <span style="font-size: 80%; color: #ccc;">
                            &nbsp;Select a style for your cookie (Minecraft or Creeper).
                        </span>
                        <br><br>
                        <a class="smallFancyButton prefButton option${MOD.cursorEnabled ? '' : ' off'}" style="margin: 0px 20px;" id="toggleCursor">
                            ${MOD.cursorEnabled ? 'Cursor: Minecraft' : 'Cursor: Original'}
                        </a>
                        <span style="font-size: 80%; color: #ccc;">
                            &nbsp;Selects whether to use the Minecraft cursor or Cookie Clicker. Useful if you switch to Creeper style and want to disable the Minecraft cursor.
                        </span>
                        <br><br>
                        <a class="smallFancyButton prefButton option${MOD.useMinecraftBackgrounds ? '' : ' off'}" style="margin: 0px 20px;" id="toggleBackgroundStyle">
                            ${MOD.useMinecraftBackgrounds ? 'Backgrounds: Minecraft' : 'Backgrounds: Original'}
                        </a>
                        <span style="font-size: 80%; color: #ccc;">
                            &nbsp;Selects whether to use Minecraft-themed backgrounds or Cookie Clicker.
                        </span>
                        <br><br>
                        <a class="smallFancyButton prefButton option${MOD.useFarmBackground ? '' : ' off'}" style="margin: 0px 20px;" id="toggleFarmBackground">
                            ${MOD.useFarmBackground ? 'Background Farm: ON' : 'Background Farm: OFF'}
                        </a>
                        <span style="font-size: 80%; color: #ccc;">
                            &nbsp;If enabled, all backgrounds are replaced with Farm Background. Useful if you switch to the Creeper cookie style.
                        </span>
                        <br><br>
                        <a class="smallFancyButton prefButton option${MOD.useMinecraftWrinklers ? '' : ' off'}" style="margin: 0px 20px;" id="toggleWrinklerStyle">
                            ${MOD.useMinecraftWrinklers ? 'Wrinklers: Minecraft' : 'Wrinklers: Original'}
                        </a>
                        <span style="font-size: 80%; color: #ccc;">
                            &nbsp;Selects whether to use Minecraft-themed wrinkler sprites or original Cookie Clicker.
                        </span>
                        <br><br>
                        <a class="smallFancyButton prefButton option${MOD.useMinecraftIcons ? '' : ' off'}" style="margin: 0px 20px;" id="toggleIconsStyle">
                            ${MOD.useMinecraftIcons ? 'Icons: Minecraft' : 'Icons: Original'}
                        </a>
                        <span style="font-size: 80%; color: #ccc;">
                            &nbsp;Selects whether to use Minecraft-themed icons or Cookie Clicker. Useful when disabling backgrounds.
                        </span>
                        <br><br>
                        <a class="smallFancyButton prefButton option${MOD.useMinecraftBuildings ? '' : ' off'}" style="margin: 0px 20px;" id="toggleBuildingsStyle">
                            ${MOD.useMinecraftBuildings ? 'Buildings: Minecraft' : 'Buildings: Original'}
                        </a>
                        <span style="font-size: 80%; color: #ccc;">
                            &nbsp;Select whether to use Minecraft or Cookie Clicker style enhancements.
                        </span>
                        <br>
                    </div>
                `;

                // Привязываем обработчики событий
                l('toggleMusic').onclick = function() {
                    MOD.minecraftMusicEnabled = !MOD.minecraftMusicEnabled;
                    MOD.updateMusic();
                    PlaySound('snd/tick.mp3');
                    Game.UpdateMenu();
                };

                l('toggleCookieStyle').onclick = function() {
                    MOD.cookieStyle = MOD.cookieStyle === 'minecraft' ? 'creeper' : 'minecraft';
                    MOD.updateCookieStyle();
                    PlaySound('snd/tick.mp3');
                    Game.UpdateMenu();
                };

                l('toggleCursor').onclick = function() {
                    MOD.cursorEnabled = !MOD.cursorEnabled;
                    MOD.updateCursor();
                    PlaySound('snd/tick.mp3');
                    Game.UpdateMenu();
                };

                l('toggleBackgroundStyle').onclick = function() {
                    MOD.useMinecraftBackgrounds = !MOD.useMinecraftBackgrounds;
                    MOD.updateBackgroundStyle();
                    PlaySound('snd/tick.mp3');
                    Game.UpdateMenu();
                };

                l('toggleFarmBackground').onclick = function() {
                    MOD.useFarmBackground = !MOD.useFarmBackground;
                    MOD.updateBackgroundStyle();
                    PlaySound('snd/tick.mp3');
                    Game.UpdateMenu();
                };

                l('toggleWrinklerStyle').onclick = function() {
                    MOD.useMinecraftWrinklers = !MOD.useMinecraftWrinklers;
                    MOD.updateWrinklerStyle();
                    PlaySound('snd/tick.mp3');
                    Game.UpdateMenu();
                };

                l('toggleIconsStyle').onclick = function() {
                    MOD.useMinecraftIcons = !MOD.useMinecraftIcons;
                    MOD.updateIconsStyle();
                    PlaySound('snd/tick.mp3');
                    Game.UpdateMenu();
                };

                l('toggleBuildingsStyle').onclick = function() {
                    MOD.useMinecraftBuildings = !MOD.useMinecraftBuildings;
                    MOD.updateBuildingsStyle();
                    PlaySound('snd/tick.mp3');
                    Game.UpdateMenu();
                };
            }
        };

        // Сохранение настроек
        this.save = function() {
            return JSON.stringify({
                minecraftMusicEnabled: this.minecraftMusicEnabled,
                cookieStyle: this.cookieStyle,
                cursorEnabled: this.cursorEnabled,
                useMinecraftBackgrounds: this.useMinecraftBackgrounds,
                useFarmBackground: this.useFarmBackground,
                useMinecraftWrinklers: this.useMinecraftWrinklers,
                useMinecraftIcons: this.useMinecraftIcons,
                useMinecraftBuildings: this.useMinecraftBuildings
            });
        };

        // Загрузка настроек
        this.load = function(str) {
            const data = JSON.parse(str);
            if (data.minecraftMusicEnabled !== undefined) this.minecraftMusicEnabled = data.minecraftMusicEnabled;
            if (data.cookieStyle !== undefined) this.cookieStyle = data.cookieStyle;
            if (data.cursorEnabled !== undefined) this.cursorEnabled = data.cursorEnabled;
            if (data.useMinecraftBackgrounds !== undefined) this.useMinecraftBackgrounds = data.useMinecraftBackgrounds;
            if (data.useFarmBackground !== undefined) this.useFarmBackground = data.useFarmBackground;
            if (data.useMinecraftWrinklers !== undefined) this.useMinecraftWrinklers = data.useMinecraftWrinklers;
            if (data.useMinecraftIcons !== undefined) this.useMinecraftIcons = data.useMinecraftIcons;
            if (data.useMinecraftBuildings !== undefined) this.useMinecraftBuildings = data.useMinecraftBuildings;
            // Применить загруженные настройки
            this.updateMusic();
            this.updateCookieStyle();
            this.updateCursor();
            this.updateBackgroundStyle();
            this.updateWrinklerStyle();
            this.updateIconsStyle();
            this.updateBuildingsStyle();
        };
    }
});

