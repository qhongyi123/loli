(function() {
    var loadingScreen   = document.getElementById('screen-loading');
    var startScreen     = document.getElementById('screen-start');
    var selectScreen    = document.getElementById('screen-select');
    var virusScreen     = document.getElementById('screen-virus');
    var worldScreen     = document.getElementById('screen-world');
    var talentScreen    = document.getElementById('screen-talent');
    var openingScreen   = document.getElementById('screen-opening');
    var mapScreen       = document.getElementById('screen-map');
    var settingsOV      = document.getElementById('settings-overlay');
    var toggleBtn       = document.getElementById('toggle-transition');
    var tipEl           = document.getElementById('loading-tip');
    var STORAGE_KEY     = 'loli_company_transition';

    var gameScreen = document.getElementById('screen-game');
    var upgradeScreen = document.getElementById('screen-upgrade');

    var transitionON = true;
    try {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== null) transitionON = (saved === 'true');
    } catch(e) {}

    var tips = window.__LOLI_TIPS__ || [];

    function updateToggleUI() {
        if (transitionON) {
            toggleBtn.classList.add('on');
        } else {
            toggleBtn.classList.remove('on');
        }
    }
    updateToggleUI();

    function showScreen(target) {
        document.querySelectorAll('.screen').forEach(function(s) {
            s.classList.remove('active');
        });
        target.classList.add('active');
        if (target === gameScreen) { updateGameTime(); updateSelectModeUI(); }
    }

    function showStart() {
        showScreen(startScreen);
    }

    function openSettings() {
        settingsOV.classList.add('active');
    }

    function closeSettings() {
        settingsOV.classList.remove('active');
    }

    function showRandomTip() {
        if (tips.length > 0) {
            var i = Math.floor(Math.random() * tips.length);
            tipEl.textContent = '小贴士：' + tips[i].text;
        } else {
            tipEl.textContent = '';
        }
    }

    document.getElementById('btn-start').addEventListener('click', function() {
        if (transitionON) {
            showRandomTip();
            showScreen(loadingScreen);
            setTimeout(function() {
                showScreen(selectScreen);
            }, 2000);
        } else {
            showScreen(selectScreen);
        }
    });

    var selectCards = document.querySelectorAll('#screen-select .card');
    if (selectCards.length >= 1) {
        selectCards[0].addEventListener('click', function() {
            if (transitionON) {
                showRandomTip();
                showScreen(loadingScreen);
                setTimeout(function() {
                    showScreen(virusScreen);
                }, 2000);
            } else {
                showScreen(virusScreen);
            }
        });
    }
    if (selectCards.length >= 3) {
        selectCards[2].addEventListener('click', function() {
            upgradeReturnScreen = selectScreen;
            showScreen(upgradeScreen);
        });
    }

    document.getElementById('btn-virus-back').addEventListener('click', function() {
        showScreen(selectScreen);
    });

    var virusCards = document.querySelectorAll('.virus-card');
    virusCards.forEach(function(card) {
        card.addEventListener('click', function() {
            virusCards.forEach(function(c) { c.classList.remove('selected'); });
            card.classList.add('selected');
            if (transitionON) {
                showRandomTip();
                showScreen(loadingScreen);
                setTimeout(function() {
                    showScreen(worldScreen);
                }, 2000);
            } else {
                showScreen(worldScreen);
            }
        });
    });

    document.getElementById('btn-world-back').addEventListener('click', function() {
        showScreen(virusScreen);
    });

    var worldCards = document.querySelectorAll('.world-card');
    worldCards.forEach(function(card) {
        card.addEventListener('click', function() {
            if (card.classList.contains('world-card-locked')) return;
            worldCards.forEach(function(c) { c.classList.remove('selected'); });
            card.classList.add('selected');

            var worldNameEl = card.querySelector('.world-card-name');
            var worldName = worldNameEl ? worldNameEl.textContent.trim() : '';
            var isModern = worldName === '\u73B0\u4EE3\u4E16\u754C';

            if (!isModern) {
                rmapState.selectedWorldName = worldName;
                window.__RANDOM_MAP_DATA__ = null;
                resetRmapScreen();
                applyWorldPreset(worldName);
                document.getElementById('map-area').innerHTML = originalMapAreaHTML;
                document.getElementById('game-map-inner').innerHTML = originalGameMapInnerHTML;
                document.getElementById('game-map-area').style.backgroundColor = ORIGINAL_OCEAN_COLOR;
                screenMapNeedsRebind = true;
                gameMapNeedsRebind = true;
                var mapTitle = document.querySelector('#screen-random-map .title');
                mapTitle.textContent = '\u968F\u673A\u5730\u56FE \u2014 ' + worldName;
                if (transitionON) {
                    showRandomTip();
                    showScreen(loadingScreen);
                    setTimeout(function() {
                        showScreen(randomMapScreen);
                    }, 2000);
                } else {
                    showScreen(randomMapScreen);
                }
                return;
            }

            window.__RANDOM_MAP_DATA__ = null;
            document.getElementById('map-area').innerHTML = originalMapAreaHTML;
            document.getElementById('game-map-inner').innerHTML = originalGameMapInnerHTML;
            document.getElementById('game-map-area').style.backgroundColor = ORIGINAL_OCEAN_COLOR;
            gameZoomLevel = 1.0;
            updateZoomUI();
            screenMapNeedsRebind = true;
            gameMapNeedsRebind = true;
            document.querySelector('#screen-map .title').textContent = '\u73B0 \u4EE3 \u4E16 \u754C';
            if (transitionON) {
                showRandomTip();
                showScreen(loadingScreen);
                setTimeout(function() {
                    showScreen(talentScreen);
                }, 2000);
            } else {
                showScreen(talentScreen);
            }
        });
    });

    document.getElementById('btn-talent-back').addEventListener('click', function() {
        showScreen(worldScreen);
    });

    document.getElementById('btn-continue').addEventListener('click', function() {
        if (transitionON) {
            showRandomTip();
            showScreen(loadingScreen);
            setTimeout(function() {
                showScreen(openingScreen);
            }, 2000);
        } else {
            showScreen(openingScreen);
        }
    });

    document.getElementById('btn-opening-back').addEventListener('click', function() {
        showScreen(talentScreen);
    });

    var openingCards = document.querySelectorAll('.opening-card');
    openingCards.forEach(function(card) {
        card.addEventListener('click', function() {
            openingCards.forEach(function(c) { c.classList.remove('selected'); });
            card.classList.add('selected');
        });
    });

    document.getElementById('btn-opening-continue').addEventListener('click', function() {
        if (transitionON) {
            showRandomTip();
            showScreen(loadingScreen);
            setTimeout(function() {
                showScreen(mapScreen);
            }, 2000);
        } else {
            showScreen(mapScreen);
        }
    });

    document.getElementById('btn-map-back').addEventListener('click', function() {
        showScreen(openingScreen);
    });

    var mapRegions = document.querySelectorAll('.map-region-group');
    var mapContinueBtn = document.getElementById('btn-map-continue');
    mapRegions.forEach(function(region) {
        region.addEventListener('click', function() {
            mapRegions.forEach(function(r) { r.classList.remove('selected'); });
            region.classList.add('selected');
            mapContinueBtn.classList.add('visible');
        });
    });

    document.getElementById('btn-map-continue').addEventListener('click', function() {
        if (transitionON) {
            showRandomTip();
            showScreen(loadingScreen);
            setTimeout(function() {
                showScreen(gameScreen);
            }, 2000);
        } else {
            showScreen(gameScreen);
        }
    });

    document.getElementById('btn-back').addEventListener('click', function() {
        showStart();
    });

    document.getElementById('btn-settings').addEventListener('click', function() {
        openSettings();
    });

    document.getElementById('btn-settings-close').addEventListener('click', function() {
        closeSettings();
    });

    settingsOV.addEventListener('click', function(e) {
        if (e.target === settingsOV) closeSettings();
    });

    toggleBtn.addEventListener('click', function() {
        transitionON = !transitionON;
        updateToggleUI();
        try { localStorage.setItem(STORAGE_KEY, String(transitionON)); } catch(e) {}
    });

    var devOverlay = document.getElementById('dev-overlay');
    var randomMapScreen = document.getElementById('screen-random-map');

    var screenMap = {
        'screen-start':      startScreen,
        'screen-select':     selectScreen,
        'screen-virus':      virusScreen,
        'screen-world':      worldScreen,
        'screen-talent':     talentScreen,
        'screen-opening':    openingScreen,
        'screen-map':        mapScreen,
        'screen-game':       gameScreen,
        'screen-upgrade':    upgradeScreen,
        'screen-random-map': randomMapScreen
    };

    document.getElementById('btn-dev-panel').addEventListener('click', function() {
        settingsOV.classList.remove('active');
        devOverlay.classList.add('active');
    });

    document.getElementById('btn-dev-close').addEventListener('click', function() {
        devOverlay.classList.remove('active');
    });

    devOverlay.addEventListener('click', function(e) {
        if (e.target === devOverlay) devOverlay.classList.remove('active');
    });

    var devJumpBtns = document.querySelectorAll('.dev-jump-btn');
    devJumpBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var targetId = btn.getAttribute('data-screen');
            var targetScreen = screenMap[targetId];
            if (targetScreen) {
                devOverlay.classList.remove('active');
                showScreen(targetScreen);
            }
        });
    });

    var progressText = document.getElementById('progress-text');
    var segInfected = document.getElementById('seg-infected');
    var segHealthy = document.getElementById('seg-healthy');
    var segDead = document.getElementById('seg-dead');

    var regionNames = {
        'region-na2': '北美洲',
        'region-gl2': '格陵兰岛',
        'region-sa2': '南美洲',
        'region-eu2': '欧洲',
        'region-af2': '非洲',
        'region-as2': '亚洲',
        'region-oc2': '大洋洲'
    };

    function terrainLabelForOriginalRegion(regionId, x, y) {
        var n1 = Math.sin(x * 0.013 + y * 0.007) * 0.5 + 0.5;
        var n2 = Math.cos(x * 0.009 - y * 0.011) * 0.5 + 0.5;

        switch (regionId) {
            case 'region-na2':
                if (y < 36) return '冰原·苔原';
                if (y < 72) return n1 > 0.5 ? '针叶林' : '苔原';
                if (y < 120) return n1 > 0.55 ? '山地' : (n2 > 0.45 ? '森林' : '平原');
                if (y < 170) return n1 > 0.6 ? '山地' : (n2 > 0.5 ? '草原' : '丘陵');
                return n1 > 0.55 ? '沙漠' : '草原';
            case 'region-gl2':
                return y < 54 ? '冰原' : '苔原';
            case 'region-sa2':
                if (y < 200) return n1 > 0.3 ? '热带雨林' : '雨林';
                if (y < 250) return n1 > 0.5 ? '山地' : '森林';
                return n2 > 0.5 ? '草原' : '丘陵';
            case 'region-eu2':
                if (y < 45) return n1 > 0.5 ? '针叶林' : '苔原';
                if (y < 85) return n1 > 0.55 ? '山地' : (n2 > 0.45 ? '森林' : '平原');
                if (y < 125) return n2 > 0.5 ? '丘陵' : '平原';
                return '森林·丘陵';
            case 'region-af2':
                if (y < 150) return n1 > 0.6 ? '沙漠' : '草原';
                if (y < 190) return n1 > 0.55 ? '草原' : (n2 > 0.5 ? '山地' : '草原');
                if (y < 220) return n2 > 0.6 ? '雨林' : '草原';
                return '山地·草原';
            case 'region-as2':
                if (y < 54) return n1 > 0.5 ? '苔原' : '针叶林';
                if (y < 100) return n1 > 0.55 ? '山地' : (n2 > 0.5 ? '森林' : '草原');
                if (y < 145) return n1 > 0.6 ? '高山' : (n2 > 0.55 ? '沙漠' : '草原');
                if (y < 190) return n2 > 0.5 ? '雨林' : '丘陵';
                return '森林·山地';
            case 'region-oc2':
                return n1 > 0.55 ? '沙漠' : (n2 > 0.5 ? '草原' : '海滨');
            default:
                return '地形多变';
        }
    }

    var gameRegions = document.querySelectorAll('.game-map-area .map-region-group');
    gameRegions.forEach(function(region) {
        region.addEventListener('click', function(e) {
            e.stopPropagation();
            gameRegions.forEach(function(r) { r.classList.remove('selected'); });
            region.classList.add('selected');

            var infected = Math.floor(Math.random() * 60) + 5;
            var dead = Math.floor(Math.random() * 20) + 1;
            var healthy = 100 - infected - dead;

            var name = regionNames[region.id] || region.id;
            progressText.textContent = name + ' — 已感染 ' + infected + '% / 健康 ' + healthy + '% / 死亡 ' + dead + '%';
            segInfected.style.width = infected + '%';
            segHealthy.style.width = healthy + '%';
            segDead.style.width = dead + '%';
        });
    });

    var newsTime = document.getElementById('news-time');
    function updateGameTime() {
        try {
            var now = new Date();
            if (isNaN(now.getTime())) throw new Error();
            newsTime.textContent = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
        } catch(e) {
            newsTime.textContent = '2026年1月1日';
        }
    }

    var loliMenuOverlay = document.getElementById('loli-menu-overlay');
    var btnNewsLoli = document.getElementById('news-loli');

    var evoPoints = document.getElementById('evo-points');
    evoPoints.textContent = '进化点数：5';

    btnNewsLoli.addEventListener('click', function() {
        loliMenuOverlay.classList.add('active');
    });

    document.getElementById('btn-menu-resume').addEventListener('click', function() {
        loliMenuOverlay.classList.remove('active');
    });

    document.getElementById('btn-menu-quit').addEventListener('click', function() {
        loliMenuOverlay.classList.remove('active');
        showScreen(selectScreen);
    });

    loliMenuOverlay.addEventListener('click', function(e) {
        if (e.target === loliMenuOverlay) {
            loliMenuOverlay.classList.remove('active');
        }
    });

    var evoSlot = document.querySelector('.evo-slot');
    var upgradeReturnScreen = gameScreen;

    evoSlot.addEventListener('click', function() {
        upgradeReturnScreen = gameScreen;
        showScreen(upgradeScreen);
    });

    document.getElementById('btn-upgrade-back').addEventListener('click', function() {
        showScreen(upgradeReturnScreen);
    });

    var upgradeTabs = document.querySelectorAll('.upgrade-tab');
    var upgradePanels = document.querySelectorAll('.upgrade-panel');
    upgradeTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            upgradeTabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');
            var idx = parseInt(tab.getAttribute('data-tab'));
            upgradePanels.forEach(function(p) { p.classList.remove('active'); });
            if (upgradePanels[idx]) upgradePanels[idx].classList.add('active');
        });
    });

    function buildHexGrid(containerId, template) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var ROWS = 8, COLS = 15;
        var W = 81, H = 70;
        var w = W, h = H;
        var yOffset = -h / 2;
        var selectedSet = {};
        if (template && template.length) {
            for (var i = 0; i < template.length; i++) {
                selectedSet[template[i][0] + ',' + template[i][1]] = true;
            }
        }
        
        for (var row = 0; row < ROWS; row++) {
            for (var col = 0; col < COLS; col++) {
                if (row === 0 && col % 2 === 0) continue;
                if (row === ROWS - 1 && col % 2 === 1) continue;

                var newRow = row;
                var newCol;
                if (row === 0 || row === ROWS - 1) {
                    newCol = Math.floor(col / 2);
                } else {
                    newCol = col;
                }

                var cell = document.createElement('div');
                cell.className = 'hex-cell';
                var x = col * w * 0.75;
                var y = row * h + (col % 2 === 1 ? h / 2 : 0) + yOffset;
                cell.style.left = x + 'px';
                cell.style.top = y + 'px';
                
                var label = document.createElement('span');
                label.className = 'hex-label';
                label.textContent = newRow + ',' + newCol;
                cell.appendChild(label);

                if (selectedSet[newRow + ',' + newCol]) {
                    cell.classList.add('selected');
                }

                cell.addEventListener('click', function() {
                    this.classList.toggle('selected');
                });

                container.appendChild(cell);
            }
        }
        
        var totalW = (COLS - 1) * w * 0.75 + w;
        var totalH = (ROWS - 1) * h + h;
        container.style.width = totalW + 'px';
        container.style.height = totalH + 'px';
    }

    buildHexGrid('hex-grid-spread',  window.__TEMPLATE_SPREAD__  || []);
    buildHexGrid('hex-grid-symptom', window.__TEMPLATE_SYMPTOM__  || []);
    buildHexGrid('hex-grid-ability', window.__TEMPLATE_ABILITY__  || []);

    var originalMapAreaHTML = document.getElementById('map-area').innerHTML;
    var originalGameMapInnerHTML = document.getElementById('game-map-inner').innerHTML;
    var ORIGINAL_OCEAN_COLOR = '#152c45';

    // ============================================================
    // RANDOM MAP SYSTEM
    // ============================================================
    var MAP_W = 1000;
    var MAP_H = 560;
    var PIXEL_CELL = 4;

    var rmapState = {
        modules: [],
        placedRegions: [],
        selectedModuleIdx: -1,
        selectedRegionIdx: -1,
        generated: false,
        selectedWorldName: '',
        oceanColor: '#0a2640',
        mapMode: 1,
        terrainStyle: 0,
        terrainParams: { landRatio: 35, mountainStrength: 50, forestDensity: 50, aridity: 50, fragmentation: 50, coastComplexity: 50 },
        worldPresetKey: '-1'
    };

    var STYLE_CONFIG = [
        { name: '\u5927\u9646', seaBase: 0.37, lrDefault: 35, noiseW: 0.65, shapeW: 0.35 },
        { name: '\u7FA4\u5C9B', seaBase: 0.55, lrDefault: 18, noiseW: 0.70, shapeW: 0.30 },
        { name: '\u76D8\u53E4', seaBase: 0.28, lrDefault: 55, noiseW: 0.50, shapeW: 0.50 },
        { name: '\u7834\u788E', seaBase: 0.55, lrDefault: 15, noiseW: 0.95, shapeW: 0.05 },
        { name: '\u6761\u5E26', seaBase: 0.42, lrDefault: 30, noiseW: 0.60, shapeW: 0.40 },
        { name: '\u73AF\u72B6', seaBase: 0.42, lrDefault: 25, noiseW: 0.60, shapeW: 0.40 }
    ];

    var WORLD_PRESETS = {
        '\u73B0\u4EE3\u4E16\u754C': { style: 0, landRatio: 35, mountainStrength: 50, forestDensity: 50, aridity: 50, fragmentation: 40, coastComplexity: 50 },
        '\u4FEE\u4ED9\u4E16\u754C': { style: 0, landRatio: 35, mountainStrength: 75, forestDensity: 70, aridity: 20, fragmentation: 35, coastComplexity: 70 },
        '\u897F\u5E7B\u4E16\u754C': { style: 0, landRatio: 40, mountainStrength: 60, forestDensity: 60, aridity: 30, fragmentation: 40, coastComplexity: 55 },
        '\u4E2D\u4E16\u7EAA\u4E16\u754C': { style: 0, landRatio: 40, mountainStrength: 30, forestDensity: 50, aridity: 50, fragmentation: 35, coastComplexity: 35 },
        '\u672B\u65E5\u5E9F\u571F': { style: 3, landRatio: 25, mountainStrength: 25, forestDensity: 15, aridity: 85, fragmentation: 75, coastComplexity: 30 },
        '\u6DF7\u5408\u4E16\u754C': { style: 3, landRatio: 35, mountainStrength: 55, forestDensity: 55, aridity: 50, fragmentation: 80, coastComplexity: 70 }
    };

    var PRESET_KEY_TO_WORLD = {
        'modern': '\u73B0\u4EE3\u4E16\u754C',
        'xiuxian': '\u4FEE\u4ED9\u4E16\u754C',
        'xihuan': '\u897F\u5E7B\u4E16\u754C',
        'medieval': '\u4E2D\u4E16\u7EAA\u4E16\u754C',
        'wasteland': '\u672B\u65E5\u5E9F\u571F',
        'mixed': '\u6DF7\u5408\u4E16\u754C'
    };

    var WORLD_TO_PRESET_KEY = {};
    for (var k in PRESET_KEY_TO_WORLD) {
        if (PRESET_KEY_TO_WORLD.hasOwnProperty(k)) WORLD_TO_PRESET_KEY[PRESET_KEY_TO_WORLD[k]] = k;
    }

    var fullTerrainData = null;

    // ---- PRNG ----
    function prng(seed) {
        var s = seed | 0;
        return function() {
            s = (s * 1103515245 + 12345) & 0x7fffffff;
            return (s >> 16) / 32767;
        };
    }

    // ---- Module shape generation (blob polygon) ----
    var MODULE_COLORS = ['3a6c2f','4a7c3f','5a8c4f','3e5a24','556b3f','4d6b2e','5c6e3a','6a7e45','3e6b3a','4e6c35'];

    var _noisePerm = null;

    function buildNoisePerm(seed) {
        var rng = prng(seed);
        var p = new Array(512);
        for (var i = 0; i < 256; i++) p[i] = i;
        for (var i = 255; i > 0; i--) {
            var j = Math.floor(rng() * (i + 1));
            var tmp = p[i]; p[i] = p[j]; p[j] = tmp;
        }
        for (var i = 0; i < 256; i++) p[i + 256] = p[i];
        return p;
    }

    function _lerp(a, b, t) { return a + t * (b - a); }
    function _fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }

    function noise2D(x, y) {
        var X = Math.floor(x) & 255;
        var Y = Math.floor(y) & 255;
        var xf = x - Math.floor(x);
        var yf = y - Math.floor(y);
        var u = _fade(xf);
        var v = _fade(yf);
        var aa = _noisePerm[_noisePerm[X] + Y];
        var ba = _noisePerm[_noisePerm[X + 1] + Y];
        var ab = _noisePerm[_noisePerm[X] + Y + 1];
        var bb = _noisePerm[_noisePerm[X + 1] + Y + 1];
        return _lerp(_lerp(aa, ba, u), _lerp(ab, bb, u), v) / 255;
    }

    function fbmNoise(x, y, octaves, lacunarity, gain) {
        var value = 0, amplitude = 1, frequency = 1, maxVal = 0;
        for (var i = 0; i < octaves; i++) {
            value += amplitude * noise2D(x * frequency, y * frequency);
            maxVal += amplitude;
            amplitude *= gain;
            frequency *= lacunarity;
        }
        return value / maxVal;
    }

    function terrainColor(h, m) {
        if (h < 0.15) return '#061e3e';
        if (h < 0.30) return '#0a3058';
        if (h < 0.35) return '#1a4a6a';
        if (h < 0.38) return '#2a6a8a';
        if (h < 0.40) return '#c4b878';
        if (m < 0.25) {
            if (h < 0.55) return '#c4a040';
            if (h < 0.70) return '#b09040';
            return '#a08050';
        }
        if (m < 0.45) {
            if (h < 0.50) return '#8a9c40';
            if (h < 0.65) return '#7a8c50';
            return '#8a8060';
        }
        if (h < 0.50) return '#4a8c3f';
        if (h < 0.60) return '#3a7028';
        if (h < 0.72) return '#4a6a3a';
        if (h < 0.82) return '#6a6a4a';
        if (h < 0.90) return '#8a7a6a';
        return '#d0d8d8';
    }

    function terrainLabel(h, m) {
        if (h < 0.15) return '\u6DF1\u6D77';
        if (h < 0.30) return '\u6D45\u6D77';
        if (h < 0.35) return '\u8FD1\u6D77\u6C34\u57DF';
        if (h < 0.38) return '\u6CBF\u6D77\u6C34\u57DF';
        if (h < 0.40) return '\u6C99\u6EE9';
        if (m < 0.25) {
            if (h < 0.55) return '\u8352\u6F20';
            if (h < 0.70) return '\u9AD8\u5730\u8352\u91CE';
            return '\u88F8\u5CA9';
        }
        if (m < 0.45) {
            if (h < 0.50) return '\u8349\u539F';
            if (h < 0.65) return '\u4E18\u9675';
            return '\u82D4\u539F';
        }
        if (h < 0.50) return '\u68EE\u6797';
        if (h < 0.60) return '\u5BC6\u6797';
        if (h < 0.72) return '\u5C71\u6797';
        if (h < 0.82) return '\u9AD8\u5C71';
        if (h < 0.90) return '\u5C71\u5730';
        return '\u96EA\u5C71';
    }

    function pickRegionSeeds(cells, n) {
        if (cells.length <= n) return cells.slice(0, n);
        var seeds = [cells[Math.floor(Math.random() * cells.length)]];
        var minDists = new Array(cells.length);
        for (var k = 1; k < n; k++) {
            var totalWeight = 0;
            for (var i = 0; i < cells.length; i++) {
                var minDist = Infinity;
                for (var j = 0; j < seeds.length; j++) {
                    var dx = cells[i].x - seeds[j].x;
                    var dy = cells[i].y - seeds[j].y;
                    var d = dx * dx + dy * dy;
                    if (d < minDist) minDist = d;
                }
                minDists[i] = minDist;
                totalWeight += minDist;
            }
            var r = Math.random() * totalWeight;
            var cumulative = 0, chosen = 0;
            for (var i = 0; i < cells.length; i++) {
                cumulative += minDists[i];
                if (cumulative >= r) { chosen = i; break; }
            }
            seeds.push(cells[chosen]);
        }
        return seeds;
    }

    function computeStyleFactors() {
        var cfg = STYLE_CONFIG[rmapState.terrainStyle];
        var p = rmapState.terrainParams;
        var seaLevel = 0.65 - p.landRatio * 0.008;
        var mtnMult = 0.4 + (p.mountainStrength / 100) * 1.2;
        var forestOff = (p.forestDensity - 50) / 100 * 0.3;
        var aridOff = -(p.aridity - 50) / 100 * 0.4;
        var fragShapeMult = 1 - (p.fragmentation - 50) / 100 * 0.6;
        var lacunarity = 2.0 + (p.fragmentation - 50) / 100 * 1.5;
        var octaves = Math.max(3, Math.round(6 + (p.coastComplexity - 50) / 100 * 4));
        var gain = 0.3 + (p.coastComplexity - 50) / 100 * 0.3;
        var noiseW = cfg.noiseW;
        var shapeW = cfg.shapeW * fragShapeMult;
        var totalW = noiseW + shapeW;
        if (totalW > 0.001) { noiseW /= totalW; shapeW /= totalW; }
        return { seaLevel: seaLevel, mtnMult: mtnMult, forestOff: forestOff, aridOff: aridOff,
                 lacunarity: lacunarity, octaves: octaves, gain: gain,
                 noiseW: noiseW, shapeW: shapeW };
    }

    function computeShape(x, y, cellsW, cellsH, style) {
        var halfW = cellsW / 2, halfH = cellsH / 2;
        var dx = (x - halfW) / (cellsW * 0.42);
        var dy = (y - halfH) / (cellsH * 0.42);
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (style === 0) {
            return 1 - Math.min(dist, 1) * 0.55;
        }
        if (style === 2) {
            return 1 - Math.min(dist, 1) * 0.3;
        }
        if (style === 3) {
            return 0.5;
        }
        if (style === 4) {
            var band = (y / (cellsH - 1)) * 2 - 1;
            var v = Math.cos(band * Math.PI * 3) * 0.5 + 0.5;
            return 0.2 + v * 0.6;
        }
        if (style === 5) {
            return Math.max(0, Math.min(1, 1 - Math.abs(dist - 0.38) * 3));
        }
        var centers = [
            [-0.2,-0.15],[0.2,-0.2],[0.05,0.15],[-0.25,0.15],
            [0.3,0.05],[-0.05,-0.05],[-0.15,-0.3],[0.35,-0.15],
            [-0.1,0.3],[0.15,-0.3],[-0.3,0.05],[0.25,0.2]
        ];
        var val = 0;
        for (var i = 0; i < centers.length; i++) {
            var cdx = (x + centers[i][0] * cellsW * 0.35 - halfW) / (cellsW * 0.15);
            var cdy = (y + centers[i][1] * cellsH * 0.35 - halfH) / (cellsH * 0.15);
            var cd = Math.sqrt(cdx * cdx + cdy * cdy);
            val = Math.max(val, 1 - Math.min(cd * 1.5, 1));
        }
        return val * 0.8 + 0.1;
    }

    function generateFullTerrain() {
        var seed = Math.floor(Math.random() * 2147483647);
        _noisePerm = buildNoisePerm(seed);
        var cellsW = Math.floor(MAP_W / PIXEL_CELL);
        var cellsH = Math.floor(MAP_H / PIXEL_CELL);
        var factors = computeStyleFactors();
        var style = rmapState.terrainStyle;
        var heightmap = [], moisture = [];
        for (var y = 0; y < cellsH; y++) {
            heightmap[y] = []; moisture[y] = [];
            for (var x = 0; x < cellsW; x++) {
                var h = fbmNoise(x * 0.018, y * 0.018, factors.octaves, factors.lacunarity, factors.gain);
                h = h * factors.mtnMult;
                var shapeVal = computeShape(x, y, cellsW, cellsH, style);
                h = h * factors.noiseW + shapeVal * factors.shapeW;
                heightmap[y][x] = Math.max(0, Math.min(1, h));
                var latFactor = 1 - Math.abs(y - cellsH / 2) / (cellsH / 2) * 0.5;
                var m = (latFactor + fbmNoise(x * 0.025 + 50, y * 0.025 + 50, 3, 2.2, 0.5)) / 2;
                m += factors.forestOff + factors.aridOff;
                moisture[y][x] = Math.max(0, Math.min(1, m));
            }
        }
        var seaLevel = factors.seaLevel;
        var landCells = [], cellToIdx = {};
        for (var y = 0; y < cellsH; y++) {
            for (var x = 0; x < cellsW; x++) {
                if (heightmap[y][x] >= seaLevel) {
                    var idx = landCells.length;
                    landCells.push({x: x, y: y});
                    cellToIdx[x + ',' + y] = idx;
                }
            }
        }
        if (landCells.length < 60) {
            seaLevel = 0.32; landCells = []; cellToIdx = {};
            for (var y = 0; y < cellsH; y++)
                for (var x = 0; x < cellsW; x++)
                    if (heightmap[y][x] >= seaLevel) {
                        var idx = landCells.length;
                        landCells.push({x: x, y: y});
                        cellToIdx[x + ',' + y] = idx;
                    }
        }
        var visited = {}, landmasses = [];
        for (var i = 0; i < landCells.length; i++) {
            var c = landCells[i], key = c.x + ',' + c.y;
            if (visited[key]) continue;
            var mass = [], stack = [c]; visited[key] = true;
            while (stack.length > 0) {
                var cur = stack.pop(); mass.push(cur);
                var nb = [{x:cur.x-1,y:cur.y},{x:cur.x+1,y:cur.y},{x:cur.x,y:cur.y-1},{x:cur.x,y:cur.y+1}];
                for (var n = 0; n < nb.length; n++) {
                    var nk = nb[n].x + ',' + nb[n].y;
                    if (cellToIdx.hasOwnProperty(nk) && !visited[nk]) { visited[nk] = true; stack.push(nb[n]); }
                }
            }
            if (mass.length >= 25) landmasses.push(mass);
        }
        landmasses.sort(function(a, b) { return b.length - a.length; });
        var totalLand = 0;
        for (var m = 0; m < landmasses.length; m++) totalLand += landmasses[m].length;
        var targetRegions = Math.max(4, Math.min(18, Math.floor(totalLand / 700)));
        var allSeeds = [];
        for (var m = 0; m < landmasses.length; m++) {
            var n = Math.max(1, Math.round(targetRegions * landmasses[m].length / totalLand));
            var seeds = pickRegionSeeds(landmasses[m], n);
            allSeeds.push.apply(allSeeds, seeds);
        }
        var regionMap = [];
        for (var y = 0; y < cellsH; y++) { regionMap[y] = []; for (var x = 0; x < cellsW; x++) regionMap[y][x] = -1; }
        for (var i = 0; i < landCells.length; i++) {
            var c = landCells[i], minDist = Infinity, nearest = 0;
            for (var s = 0; s < allSeeds.length; s++) {
                var dx = c.x - allSeeds[s].x, dy = c.y - allSeeds[s].y;
                var d = dx * dx + dy * dy;
                if (d < minDist) { minDist = d; nearest = s; }
            }
            regionMap[c.y][c.x] = nearest;
        }
        var regionCells = [];
        for (var s = 0; s < allSeeds.length; s++) regionCells.push([]);
        for (var i = 0; i < landCells.length; i++) {
            var c = landCells[i], r = regionMap[c.y][c.x];
            if (r >= 0) regionCells[r].push(c);
        }
        var cities = [];
        for (var s = 0; s < allSeeds.length; s++) {
            var cells = regionCells[s];
            var nCities = Math.max(1, Math.floor(cells.length / 600));
            if (cells.length < 30) continue;
            var citySeeds = pickRegionSeeds(cells, nCities);
            for (var ci = 0; ci < citySeeds.length; ci++) {
                citySeeds[ci].mapX = (citySeeds[ci].x + 0.5) * PIXEL_CELL;
                citySeeds[ci].mapY = (citySeeds[ci].y + 0.5) * PIXEL_CELL;
            }
            cities.push.apply(cities, citySeeds);
        }
        fullTerrainData = {
            cellsW: cellsW, cellsH: cellsH,
            heightmap: heightmap, moisture: moisture,
            regionMap: regionMap, seaLevel: seaLevel,
            cities: cities
        };
        var regionNames = ['北境','南疆','东海','西山','中原','边陲','谷地','高原','林海','沙洲','湿地','平原','丘陵','半岛','群岛','溪谷','峻岭','盆地'];
        var validSeeds = {};
        for (var s = 0; s < allSeeds.length; s++) {
            if (regionCells[s].length >= 15) validSeeds[s] = true;
        }
        var seedToRIdx = {}; var ridx = 0;
        for (var s = 0; s < allSeeds.length; s++) {
            if (validSeeds[s]) { seedToRIdx[s] = ridx; ridx++; }
        }
        for (var i = 0; i < landCells.length; i++) {
            var c = landCells[i], rid = regionMap[c.y][c.x];
            if (!validSeeds[rid]) {
                var minD = Infinity, nearest = 0;
                for (var s = 0; s < allSeeds.length; s++) {
                    if (!validSeeds[s]) continue;
                    var dx = c.x - allSeeds[s].x, dy = c.y - allSeeds[s].y;
                    var d = dx * dx + dy * dy;
                    if (d < minD) { minD = d; nearest = s; }
                }
                rid = nearest;
            }
            regionMap[c.y][c.x] = seedToRIdx[rid];
        }
        var newRegionCells = [];
        for (var s = 0; s < allSeeds.length; s++) {
            if (validSeeds[s]) newRegionCells[seedToRIdx[s]] = [];
        }
        for (var i = 0; i < landCells.length; i++) {
            var c = landCells[i], rIdx = regionMap[c.y][c.x];
            if (rIdx >= 0) newRegionCells[rIdx].push(c);
        }
        cities = [];
        for (var s = 0; s < newRegionCells.length; s++) {
            var cells = newRegionCells[s];
            var nCities = Math.max(1, Math.floor(cells.length / 600));
            if (cells.length < 30) continue;
            var citySeeds = pickRegionSeeds(cells, nCities);
            for (var ci = 0; ci < citySeeds.length; ci++) {
                citySeeds[ci].mapX = (citySeeds[ci].x + 0.5) * PIXEL_CELL;
                citySeeds[ci].mapY = (citySeeds[ci].y + 0.5) * PIXEL_CELL;
            }
            cities.push.apply(cities, citySeeds);
        }
        fullTerrainData.cities = cities;
        var regions = [];
        for (var s = 0; s < newRegionCells.length; s++) {
            var cells = newRegionCells[s];
            var totalH = 0, totalM = 0, minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            for (var c = 0; c < cells.length; c++) {
                totalH += heightmap[cells[c].y][cells[c].x];
                totalM += moisture[cells[c].y][cells[c].x];
                if (cells[c].x < minX) minX = cells[c].x;
                if (cells[c].y < minY) minY = cells[c].y;
                if (cells[c].x > maxX) maxX = cells[c].x;
                if (cells[c].y > maxY) maxY = cells[c].y;
            }
            var avgH = totalH / cells.length, avgM = totalM / cells.length;
            var name = regionNames[s % regionNames.length];
            if (allSeeds.length > regionNames.length) name += String.fromCharCode(65 + Math.floor(s / regionNames.length));
            var shape = [];
            for (var y = 0; y < cellsH; y++) { shape[y] = []; for (var x = 0; x < cellsW; x++) shape[y][x] = false; }
            for (var c = 0; c < cells.length; c++) shape[cells[c].y][cells[c].x] = true;
            regions.push({
                id: 'rmap-reg-ft-' + s,
                name: name,
                renderType: 'pixel',
                pixelW: cellsW, pixelH: cellsH,
                shape: shape, offsetX: 0, offsetY: 0,
                color: terrainColor(avgH, avgM),
                moduleId: s,
                labelX: (minX + maxX + 1) / 2 * PIXEL_CELL,
                labelY: (minY + maxY + 1) / 2 * PIXEL_CELL,
                isFullTerrain: true
            });
        }
        rmapState.placedRegions = regions;
        rmapState.generated = true;
        rmapState.selectedModuleIdx = -1;
        rmapState.selectedRegionIdx = -1;
        rmapState.modules = [];
        _cachedTerrainURL = '';
        renderRmapMap();
        renderModuleList();
        document.getElementById('btn-rmap-continue').style.display = 'flex';
        document.getElementById('btn-rmap-continue').classList.add('visible');
        document.getElementById('rmap-map-info').textContent = '全图生成完成 — ' + regions.length + ' 个区域, ' + cities.length + ' 座城';
    }

    function generateBlobShape(seed, size) {
        var rand = prng(seed);
        var rx, ry;
        if (size === 'large') {
            rx = 300 + rand() * 200;
            ry = 200 + rand() * 125;
        } else if (size === 'small') {
            rx = 25 + rand() * 30;
            ry = 18 + rand() * 22;
        } else {
            rx = 55 + rand() * 55;
            ry = 40 + rand() * 35;
        }
        var numPts = 8 + Math.floor(rand() * 12);
        var cx = rx + 20;
        var cy = ry + 15;
        var pts = [];
        for (var i = 0; i < numPts; i++) {
            var a = (i / numPts) * Math.PI * 2 + rand() * 0.5;
            var d = 0.5 + rand() * 0.5;
            pts.push({
                x: Math.round(cx + Math.cos(a) * rx * d),
                y: Math.round(cy + Math.sin(a) * ry * d)
            });
        }
        var dStr = 'M' + pts.map(function(p) { return p.x + ',' + p.y; }).join('L') + 'Z';
        return {
            points: pts,
            path: dStr,
            w: Math.round(cx + rx + 25),
            h: Math.round(cy + ry + 20),
            cx: Math.round(cx),
            cy: Math.round(cy)
        };
    }

    function generatePixelShape(pw, ph) {
        var rand = prng(Math.floor(Math.random() * 2147483647));
        var shape = [];
        for (var y = 0; y < ph; y++) {
            shape[y] = [];
            for (var x = 0; x < pw; x++) {
                shape[y][x] = rand() < 0.6;
            }
        }
        for (var pass = 0; pass < 5; pass++) {
            var next = [];
            for (var y = 0; y < ph; y++) {
                next[y] = [];
                for (var x = 0; x < pw; x++) {
                    var count = 0;
                    for (var dy = -1; dy <= 1; dy++) {
                        for (var dx = -1; dx <= 1; dx++) {
                            if (dx === 0 && dy === 0) continue;
                            var ny = y + dy, nx = x + dx;
                            if (ny >= 0 && ny < ph && nx >= 0 && nx < pw && shape[ny][nx]) count++;
                        }
                    }
                    next[y][x] = count >= 3 || (count >= 2 && shape[y][x]);
                }
            }
            shape = next;
        }
        var visited = [];
        for (var y = 0; y < ph; y++) {
            visited[y] = [];
            for (var x = 0; x < pw; x++) visited[y][x] = false;
        }
        var largest = [];
        for (var y = 0; y < ph; y++) {
            for (var x = 0; x < pw; x++) {
                if (!shape[y][x] || visited[y][x]) continue;
                var comp = [], stack = [{x: x, y: y}];
                visited[y][x] = true;
                while (stack.length > 0) {
                    var c = stack.pop(); comp.push(c);
                    var d2 = [{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:0},{dx:1,dy:0}];
                    for (var d = 0; d < d2.length; d++) {
                        var nx = c.x + d2[d].dx, ny = c.y + d2[d].dy;
                        if (nx >= 0 && nx < pw && ny >= 0 && ny < ph && shape[ny][nx] && !visited[ny][nx]) {
                            visited[ny][nx] = true;
                            stack.push({x: nx, y: ny});
                        }
                    }
                }
                if (comp.length > largest.length) largest = comp;
            }
        }
        var result = [];
        for (var y = 0; y < ph; y++) {
            result[y] = [];
            for (var x = 0; x < pw; x++) result[y][x] = false;
        }
        for (var i = 0; i < largest.length; i++) result[largest[i].y][largest[i].x] = true;
        for (var y = 1; y < ph - 1; y++) {
            for (var x = 1; x < pw - 1; x++) {
                if (!result[y][x]) {
                    var sc = 0;
                    for (var dy = -1; dy <= 1; dy++)
                        for (var dx = -1; dx <= 1; dx++)
                            if (result[y + dy][x + dx]) sc++;
                    if (sc >= 8) result[y][x] = true;
                }
            }
        }
        return result;
    }

    function generateModules() {
        var cntLarge = parseInt(document.getElementById('rmap-size-large').value) || 1;
        var cntMedium = parseInt(document.getElementById('rmap-size-medium').value) || 6;
        var cntSmall = parseInt(document.getElementById('rmap-size-small').value) || 1;

        var modules = [];
        var id = 0;
        var sizes = [];
        for (var i = 0; i < cntLarge; i++) sizes.push('large');
        for (var i = 0; i < cntMedium; i++) sizes.push('medium');
        for (var i = 0; i < cntSmall; i++) sizes.push('small');
        for (var i = sizes.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = sizes[i]; sizes[i] = sizes[j]; sizes[j] = tmp;
        }

        var largeIdx = 0, mediumIdx = 0, smallIdx = 0;
        for (var i = 0; i < sizes.length; i++) {
            var prefix, idx;
            if (sizes[i] === 'large') { prefix = '\u5927'; idx = largeIdx++; }
            else if (sizes[i] === 'small') { prefix = '\u5C0F'; idx = smallIdx++; }
            else { prefix = '\u4E2D'; idx = mediumIdx++; }
            var name = prefix + String.fromCharCode(65 + idx);

            if (rmapState.mapMode === 1) {
                generateFullTerrain();
                return;
            } else {
                var s = generateBlobShape(Math.floor(Math.random() * 2147483647), sizes[i]);
                var cityCount = (sizes[i] === 'large') ? (3 + Math.floor(Math.random() * 3)) : (1 + Math.floor(Math.random() * 2));
                var cities = [];
                for (var ci = 0; ci < cityCount; ci++) {
                    var ptIdx = Math.floor(Math.random() * s.points.length);
                    var pt = s.points[ptIdx];
                    var mix = 0.3 + Math.random() * 0.5;
                    cities.push({
                        mapX: Math.round(s.cx + (pt.x - s.cx) * mix),
                        mapY: Math.round(s.cy + (pt.y - s.cy) * mix)
                    });
                }
                modules.push({
                    id: id,
                    name: name,
                    renderType: 'blob',
                    path: s.path,
                    w: s.w,
                    h: s.h,
                    cx: s.cx,
                    cy: s.cy,
                    points: s.points,
                    color: '#' + MODULE_COLORS[id % MODULE_COLORS.length],
                    cities: cities
                });
            }
            id++;
        }
        rmapState.modules = modules;
        rmapState.selectedModuleIdx = -1;
        rmapState.placedRegions = [];
        rmapState.selectedRegionIdx = -1;
        rmapState.generated = false;
        document.getElementById('btn-rmap-continue').style.display = 'none';
        document.getElementById('btn-rmap-continue').classList.remove('visible');
        renderModuleList();
        renderRmapMap();
    }

    // ---- Map rendering (setup screen) ----
    var _rmapCanvas = null;
    var _cachedTerrainURL = '';

    function generateTerrainCanvas() {
        if (!_rmapCanvas) {
            _rmapCanvas = document.createElement('canvas');
            _rmapCanvas.style.display = 'none';
            document.body.appendChild(_rmapCanvas);
        }
        _rmapCanvas.width = MAP_W;
        _rmapCanvas.height = MAP_H;
        var ctx = _rmapCanvas.getContext('2d');
        ctx.fillStyle = rmapState.oceanColor;
        ctx.fillRect(0, 0, MAP_W, MAP_H);
        var h = fullTerrainData.heightmap;
        var m = fullTerrainData.moisture;
        var cw = fullTerrainData.cellsW;
        var ch = fullTerrainData.cellsH;
        var sl = fullTerrainData.seaLevel;
        for (var y = 0; y < ch; y++) {
            for (var x = 0; x < cw; x++) {
                if (h[y][x] >= sl) {
                    ctx.fillStyle = terrainColor(h[y][x], m[y][x]);
                    ctx.fillRect(x * PIXEL_CELL, y * PIXEL_CELL, PIXEL_CELL, PIXEL_CELL);
                }
            }
        }
        _cachedTerrainURL = _rmapCanvas.toDataURL();
    }

    function generateTerrainImageFromData(data) {
        var t = data.terrain;
        if (!t || !t.heightmap) return null;
        var cellsW = t.cellsW, cellsH = t.cellsH;
        var canvas = document.createElement('canvas');
        canvas.width = data.mapW;
        canvas.height = data.mapH;
        var ctx = canvas.getContext('2d');
        var oceanColor = data.oceanColor || '#0a2640';
        ctx.fillStyle = oceanColor;
        ctx.fillRect(0, 0, data.mapW, data.mapH);
        for (var y = 0; y < cellsH; y++) {
            var offset = y * cellsW;
            for (var x = 0; x < cellsW; x++) {
                var idx = offset + x;
                if (t.heightmap[idx] >= t.seaLevel) {
                    ctx.fillStyle = terrainColor(t.heightmap[idx], t.moisture[idx]);
                    ctx.fillRect(x * PIXEL_CELL, y * PIXEL_CELL, PIXEL_CELL, PIXEL_CELL);
                }
            }
        }
        return canvas.toDataURL();
    }

    function buildInteractionHTML(data) {
        var t = data.terrain;
        var rm = t.regionMap, cw = t.cellsW, ch = t.cellsH;
        var bufs = [];
        for (var i = 0; i < data.regions.length; i++) bufs[i] = '';
        for (var y = 0; y < ch; y++) {
            var off = y * cw, x = 0;
            while (x < cw) {
                var rid = rm[off + x];
                if (rid < 0) { x++; continue; }
                var sx = x;
                while (x < cw && rm[off + x] === rid) x++;
                var rw = (x - sx) * PIXEL_CELL;
                bufs[rid] += '<rect class="map-region map-int-rect" x="' + (sx * PIXEL_CELL) + '" y="' + (y * PIXEL_CELL) +
                    '" width="' + (rw + 0.3) + '" height="' + (PIXEL_CELL + 0.3) + '" data-gen="1" fill="transparent"/>';
            }
        }
        return bufs;
    }

    function buildCitiesHTML(data) {
        if (!data.cities || !data.cities.length) return '';
        var h = '';
        for (var ci = 0; ci < data.cities.length; ci++) {
            var c = data.cities[ci];
            h += '<circle class="rmap-city" data-city="' + ci + '" cx="' + c.mapX + '" cy="' + c.mapY + '" r="2.5" fill="#fff" stroke="#222" stroke-width="1"/>';
        }
        return h;
    }

    function buildCitiesFromFD() {
        if (!fullTerrainData || !fullTerrainData.cities) return '';
        var h = '';
        for (var ci = 0; ci < fullTerrainData.cities.length; ci++) {
            var c = fullTerrainData.cities[ci];
            h += '<circle class="rmap-city" data-city="' + ci + '" cx="' + c.mapX + '" cy="' + c.mapY + '" r="2.5" fill="#fff" stroke="#222" stroke-width="1"/>';
        }
        return h;
    }

    function buildCitiesFromRegions() {
        var h = '';
        for (var i = 0; i < rmapState.placedRegions.length; i++) {
            var r = rmapState.placedRegions[i];
            if (r.cities && r.cities.length) {
                for (var ci = 0; ci < r.cities.length; ci++) {
                    var c = r.cities[ci];
                    h += '<circle class="rmap-city" data-city="' + i + '-' + ci + '" cx="' + c.mapX + '" cy="' + c.mapY + '" r="2.5" fill="#fff" stroke="#222" stroke-width="1"/>';
                }
            }
        }
        return h;
    }

    function generateInteractionLayer() {
        var regionMap = fullTerrainData.regionMap;
        var cw = fullTerrainData.cellsW;
        var ch = fullTerrainData.cellsH;
        var regions = rmapState.placedRegions;
        var bufs = [];
        for (var i = 0; i < regions.length; i++) bufs[i] = '';
        for (var y = 0; y < ch; y++) {
            var x = 0;
            while (x < cw) {
                var rid = regionMap[y][x];
                if (rid < 0) { x++; continue; }
                var sx = x;
                while (x < cw && regionMap[y][x] === rid) x++;
                var rw = (x - sx) * PIXEL_CELL;
                bufs[rid] += '<rect class="map-region map-int-rect" x="' + (sx * PIXEL_CELL) +
                    '" y="' + (y * PIXEL_CELL) + '" width="' + (rw + 0.3) + '" height="' + (PIXEL_CELL + 0.3) + '" fill="transparent"/>';
            }
        }
        var html = '';
        for (var i = 0; i < regions.length; i++) {
            var r = regions[i];
            var sel = (i === rmapState.selectedRegionIdx) ? ' selected' : '';
            html += '<g class="map-region-group' + sel + '" id="' + r.id + '" data-idx="' + i + '">';
            html += bufs[i];
            html += '<text class="rmap-region-label" x="' + r.labelX + '" y="' + r.labelY +
                    '" text-anchor="middle" dominant-baseline="central" pointer-events="none">' + r.name + '</text>';
            html += '</g>';
        }
        return html;
    }

    function renderRmapMap() {
        var svg = document.getElementById('rmap-map-svg');
        var html = '<rect width="' + MAP_W + '" height="' + MAP_H + '" fill="' + rmapState.oceanColor + '"/>';
        if (fullTerrainData) {
            if (!_cachedTerrainURL) generateTerrainCanvas();
            html += '<image href="' + _cachedTerrainURL + '" width="' + MAP_W + '" height="' + MAP_H + '"/>';
            html += generateInteractionLayer();
            html += buildCitiesFromFD();
        } else {
            for (var i = 0; i < rmapState.placedRegions.length; i++) {
                var r = rmapState.placedRegions[i];
                var sel = (i === rmapState.selectedRegionIdx) ? ' selected' : '';
                html += '<g class="map-region-group' + sel + '" id="' + r.id + '" data-idx="' + i + '">';
                if (r.renderType === 'pixel') {
                    for (var py = 0; py < r.pixelH; py++) {
                        for (var px = 0; px < r.pixelW; px++) {
                            if (r.shape[py] && r.shape[py][px]) {
                                html += '<rect class="map-region" x="' + (r.offsetX + px * PIXEL_CELL) + '" y="' + (r.offsetY + py * PIXEL_CELL) +
                                        '" width="' + (PIXEL_CELL + 0.3) + '" height="' + (PIXEL_CELL + 0.3) + '" fill="' + r.color + '" stroke="none"/>';
                            }
                        }
                    }
                } else {
                    html += '<path class="map-region" d="' + r.path + '" fill="' + r.color + '"/>';
                }
                html += '<text class="rmap-region-label" x="' + r.labelX + '" y="' + r.labelY +
                        '" text-anchor="middle" dominant-baseline="central" pointer-events="none">' + r.name + '</text>';
                html += '</g>';
            }
            html += buildCitiesFromRegions();
        }
        svg.innerHTML = html;
        svg.setAttribute('viewBox', '0 0 ' + MAP_W + ' ' + MAP_H);
        bindCityClicks('rmap-map-view');

        svg.onclick = function(e) {
            var g = e.target.closest('.map-region-group');
            if (g) {
                var idx = parseInt(g.getAttribute('data-idx'));
                if (e.detail === 2 && !rmapState.placedRegions[idx].isFullTerrain) {
                    rmapState.placedRegions.splice(idx, 1);
                    rmapState.selectedRegionIdx = -1;
                    rmapState.generated = rmapState.placedRegions.length > 0;
                    renderRmapMap();
                    renderModuleList();
                    if (!rmapState.generated) {
                        document.getElementById('btn-rmap-continue').style.display = 'none';
                        document.getElementById('btn-rmap-continue').classList.remove('visible');
                    }
                } else {
                    rmapState.selectedRegionIdx = (idx === rmapState.selectedRegionIdx) ? -1 : idx;
                    rmapState.selectedModuleIdx = -1;
                    renderRmapMap();
                    renderModuleList();
                }
            } else {
                if (rmapState.selectedModuleIdx >= 0) {
                    var rect = svg.getBoundingClientRect();
                    var scaleX = MAP_W / rect.width;
                    var scaleY = MAP_H / rect.height;
                    var mx = (e.clientX - rect.left) * scaleX;
                    var my = (e.clientY - rect.top) * scaleY;
                    placeModuleOnMap(rmapState.selectedModuleIdx, mx, my);
                } else {
                    rmapState.selectedRegionIdx = -1;
                    rmapState.selectedModuleIdx = -1;
                    renderRmapMap();
                    renderModuleList();
                }
            }
        };

        svg.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            document.getElementById('rmap-map-view').classList.add('drag-over');
        });
        svg.addEventListener('dragleave', function(e) {
            document.getElementById('rmap-map-view').classList.remove('drag-over');
        });
        svg.addEventListener('drop', function(e) {
            e.preventDefault();
            document.getElementById('rmap-map-view').classList.remove('drag-over');
            var idx = parseInt(e.dataTransfer.getData('text/plain'));
            if (isNaN(idx) || idx < 0 || idx >= rmapState.modules.length) return;
            var rect = svg.getBoundingClientRect();
            var scaleX = MAP_W / rect.width;
            var scaleY = MAP_H / rect.height;
            var mx = (e.clientX - rect.left) * scaleX;
            var my = (e.clientY - rect.top) * scaleY;
            placeModuleOnMap(idx, mx, my);
        });

        updateMapInfo();
    }

    function updateMapInfo() {
        var el = document.getElementById('rmap-map-info');
        if (rmapState.selectedRegionIdx >= 0) {
            var r = rmapState.placedRegions[rmapState.selectedRegionIdx];
            el.textContent = '\u5DF2\u9009\u4E2D\u533A\u57DF: ' + r.name + ' (\u53CC\u51FB\u5220\u9664)';
        } else if (rmapState.selectedModuleIdx >= 0) {
            var m = rmapState.modules[rmapState.selectedModuleIdx];
            el.textContent = '\u5DF2\u9009\u6A21\u5757: ' + m.name + ' \u2014 \u70B9\u51FB\u5730\u56FE\u653E\u7F6E';
        } else {
            el.textContent = '\u9009\u62E9\u6A21\u5757\u540E\u70B9\u51FB\u5730\u56FE\u653E\u7F6E\uFF0C\u6216\u76F4\u63A5\u62D6\u62FD\u6A21\u5757\u5230\u5730\u56FE';
        }
    }

    // ---- Module list rendering ----
    function renderModuleList() {
        var list = document.getElementById('rmap-module-list');
        var mods = rmapState.modules;
        var placedIds = {};
        for (var i = 0; i < rmapState.placedRegions.length; i++) {
            placedIds[rmapState.placedRegions[i].moduleId] = true;
        }

        if (!mods.length) {
            if (fullTerrainData) {
                list.innerHTML = '<div class="rmap-module-empty">\u5168\u56FE\u5DF2\u751F\u6210\uFF0C\u53EF\u5728\u5730\u56FE\u4E0A\u67E5\u770B\u533A\u57DF</div>';
            } else {
                list.innerHTML = '<div class="rmap-module-empty">\u70B9\u51FB\u201C\u751F\u6210\u6A21\u5757\u201D\u521B\u5EFA\u968F\u673A\u5730\u5F62</div>';
            }
            document.getElementById('rmap-module-actions').style.display = 'none';
            return;
        }
        document.getElementById('rmap-module-actions').style.display = 'flex';

        var html = '';
        for (var i = 0; i < mods.length; i++) {
            var m = mods[i];
            var placed = !!placedIds[m.id];
            var sel = (i === rmapState.selectedModuleIdx) ? ' selected' : '';
            var cls = 'rmap-module-card' + sel + (placed ? ' rmap-module-placed' : '');
            html += '<div class="' + cls + '" draggable="' + (placed ? 'false' : 'true') + '" data-idx="' + i + '">';
            html += '<div class="rmap-module-card-preview">';
            if (m.renderType === 'pixel') {
                html += '<svg viewBox="0 0 ' + (m.pixelW * PIXEL_CELL) + ' ' + (m.pixelH * PIXEL_CELL) + '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">';
                html += '<rect width="' + (m.pixelW * PIXEL_CELL) + '" height="' + (m.pixelH * PIXEL_CELL) + '" fill="#0a2640"/>';
                for (var py = 0; py < m.pixelH; py++) {
                    for (var px = 0; px < m.pixelW; px++) {
                        if (m.shape[py] && m.shape[py][px]) {
                            html += '<rect x="' + (px * PIXEL_CELL) + '" y="' + (py * PIXEL_CELL) + '" width="' + (PIXEL_CELL + 0.3) + '" height="' + (PIXEL_CELL + 0.3) + '" fill="' + m.color + '" stroke="none"/>';
                        }
                    }
                }
                html += '</svg>';
            } else {
                html += '<svg viewBox="0 0 ' + m.w + ' ' + m.h + '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">';
                html += '<path d="' + m.path + '" fill="' + m.color + '" stroke="#6B1020" stroke-width="2"/>';
                html += '</svg>';
            }
            html += '</div>';
            html += '<div class="rmap-module-card-info">';
            html += '<span class="rmap-module-card-name">' + m.name + '</span>';
            html += '<span class="rmap-module-card-size">' + (placed ? '\u5DF2\u653E\u7F6E' : '\u53EF\u62D6\u62FD') + '</span>';
            html += '</div></div>';
        }
        list.innerHTML = html;

        var cards = list.querySelectorAll('.rmap-module-card');
        cards.forEach(function(card) {
            card.addEventListener('click', function() {
                var idx = parseInt(this.getAttribute('data-idx'));
                if (placedIds[mods[idx].id]) return;
                rmapState.selectedModuleIdx = (idx === rmapState.selectedModuleIdx) ? -1 : idx;
                rmapState.selectedRegionIdx = -1;
                renderModuleList();
                renderRmapMap();
            });
            card.addEventListener('dragstart', function(e) {
                var idx = parseInt(this.getAttribute('data-idx'));
                if (placedIds[mods[idx].id]) { e.preventDefault(); return; }
                e.dataTransfer.setData('text/plain', String(idx));
                e.dataTransfer.effectAllowed = 'copy';
                this.classList.add('dragging');
            });
            card.addEventListener('dragend', function(e) {
                this.classList.remove('dragging');
            });
        });
    }

    // ---- Placement ----
    function translatePath(dStr, tx, ty) {
        return dStr.replace(/\d+,\d+/g, function(m) {
            var parts = m.split(',');
            return (parseInt(parts[0]) + Math.round(tx)) + ',' + (parseInt(parts[1]) + Math.round(ty));
        });
    }

    function placeModuleOnMap(modIdx, mapX, mapY) {
        var m = rmapState.modules[modIdx];
        if (!m) return false;
        for (var j = 0; j < rmapState.placedRegions.length; j++) {
            if (rmapState.placedRegions[j].moduleId === m.id) return false;
        }
        var region;
        if (m.renderType === 'pixel') {
            var tx = Math.round(mapX - m.pixelW / 2);
            var ty = Math.round(mapY - m.pixelH / 2);
            var ptw = m.pixelW * PIXEL_CELL;
            var pth = m.pixelH * PIXEL_CELL;
            tx = Math.max(5, Math.min(MAP_W - ptw - 5, tx));
            ty = Math.max(5, Math.min(MAP_H - pth - 5, ty));
            region = {
                moduleId: m.id,
                id: 'rmap-reg-' + m.id,
                name: m.name,
                renderType: 'pixel',
                pixelW: m.pixelW,
                pixelH: m.pixelH,
                shape: m.shape,
                color: m.color,
                offsetX: tx,
                offsetY: ty,
                labelX: Math.round(tx + ptw / 2),
                labelY: Math.round(ty + pth / 2)
            };
        } else {
            var tx2 = mapX - m.cx;
            var ty2 = mapY - m.cy;
            tx2 = Math.max(-m.cx + 10, Math.min(MAP_W - m.w + m.cx - 10, tx2));
            ty2 = Math.max(-m.cy + 10, Math.min(MAP_H - m.h + m.cy - 10, ty2));
            var newPath = translatePath(m.path, tx2, ty2);
            var translatedCities = [];
            if (m.cities) {
                for (var tci = 0; tci < m.cities.length; tci++) {
                    translatedCities.push({
                        mapX: m.cities[tci].mapX + Math.round(tx2),
                        mapY: m.cities[tci].mapY + Math.round(ty2)
                    });
                }
            }
            region = {
                moduleId: m.id,
                id: 'rmap-reg-' + m.id,
                name: m.name,
                renderType: 'blob',
                path: newPath,
                rawPath: m.path,
                color: m.color,
                offsetX: tx2,
                offsetY: ty2,
                labelX: Math.round(tx2 + m.cx),
                labelY: Math.round(ty2 + m.cy),
                cities: translatedCities
            };
        }
        rmapState.placedRegions.push(region);
        rmapState.generated = true;
        rmapState.selectedModuleIdx = -1;
        rmapState.selectedRegionIdx = -1;
        renderRmapMap();
        renderModuleList();
        document.getElementById('btn-rmap-continue').style.display = 'flex';
        document.getElementById('btn-rmap-continue').classList.add('visible');
        return true;
    }

    function autoFillAll() {
        if (!rmapState.modules.length) return;
        clearMap();
        var cols = Math.ceil(Math.sqrt(rmapState.modules.length));
        var rows = Math.ceil(rmapState.modules.length / cols);
        var cellW = MAP_W / cols;
        var cellH = MAP_H / rows;
        for (var i = 0; i < rmapState.modules.length; i++) {
            var col = i % cols;
            var row = Math.floor(i / cols);
            var cx = cellW * col + cellW / 2 + (Math.random() - 0.5) * cellW * 0.5;
            var cy = cellH * row + cellH / 2 + (Math.random() - 0.5) * cellH * 0.5;
            cx = Math.max(50, Math.min(MAP_W - 50, cx));
            cy = Math.max(50, Math.min(MAP_H - 50, cy));
            placeModuleOnMap(i, cx, cy);
        }
    }

    function clearMap() {
        fullTerrainData = null;
        _cachedTerrainURL = '';
        rmapState.placedRegions = [];
        rmapState.selectedRegionIdx = -1;
        rmapState.selectedModuleIdx = -1;
        rmapState.generated = false;
        document.getElementById('btn-rmap-continue').style.display = 'none';
        document.getElementById('btn-rmap-continue').classList.remove('visible');
        renderRmapMap();
        renderModuleList();
    }

    function readTerrainParams() {
        return {
            landRatio: parseInt(document.getElementById('param-land-ratio').value) || 35,
            mountainStrength: parseInt(document.getElementById('param-mountain').value) || 50,
            forestDensity: parseInt(document.getElementById('param-forest').value) || 50,
            aridity: parseInt(document.getElementById('param-aridity').value) || 50,
            fragmentation: parseInt(document.getElementById('param-frag').value) || 50,
            coastComplexity: parseInt(document.getElementById('param-coast').value) || 50
        };
    }

    function setTerrainParams(p) {
        document.getElementById('param-land-ratio').value = p.landRatio;
        document.getElementById('param-mountain').value = p.mountainStrength;
        document.getElementById('param-forest').value = p.forestDensity;
        document.getElementById('param-aridity').value = p.aridity;
        document.getElementById('param-frag').value = p.fragmentation;
        document.getElementById('param-coast').value = p.coastComplexity;
        updateParamLabels();
    }

    function updateParamLabels() {
        var p = readTerrainParams();
        document.getElementById('param-val-land').textContent = p.landRatio;
        document.getElementById('param-val-mountain').textContent = p.mountainStrength;
        document.getElementById('param-val-forest').textContent = p.forestDensity;
        document.getElementById('param-val-aridity').textContent = p.aridity;
        document.getElementById('param-val-frag').textContent = p.fragmentation;
        document.getElementById('param-val-coast').textContent = p.coastComplexity;
    }

    function resetParamsForStyle(style) {
        var cfg = STYLE_CONFIG[style];
        var p = { landRatio: cfg.lrDefault, mountainStrength: 50, forestDensity: 50, aridity: 50, fragmentation: 50, coastComplexity: 50 };
        rmapState.terrainParams = p;
        setTerrainParams(p);
        rmapState.worldPresetKey = '-1';
        document.getElementById('rmap-preset-select').value = '-1';
    }

    function applyWorldPreset(worldName) {
        var preset = WORLD_PRESETS[worldName];
        if (!preset) return;
        rmapState.terrainStyle = preset.style;
        rmapState.terrainParams = {
            landRatio: preset.landRatio,
            mountainStrength: preset.mountainStrength,
            forestDensity: preset.forestDensity,
            aridity: preset.aridity,
            fragmentation: preset.fragmentation,
            coastComplexity: preset.coastComplexity
        };
        var presetKey = WORLD_TO_PRESET_KEY[worldName] || '-1';
        rmapState.worldPresetKey = presetKey;
        setTerrainParams(rmapState.terrainParams);
        updateTerrainStyleButtons();
        document.getElementById('rmap-preset-select').value = presetKey;
    }

    function updateTerrainStyleButtons() {
        var btns = document.querySelectorAll('#rmap-terrain-style-bar .rmap-style-btn');
        btns.forEach(function(b) {
            var s = parseInt(b.getAttribute('data-style'));
            b.classList.toggle('active', s === rmapState.terrainStyle);
        });
    }

    function updateTerrainUI() {
        var isPixel = rmapState.mapMode === 1;
        document.getElementById('rmap-terrain-style-bar').style.display = isPixel ? '' : 'none';
        document.getElementById('rmap-terrain-params').style.display = isPixel ? '' : 'none';
        if (isPixel) {
            setTerrainParams(rmapState.terrainParams);
            document.getElementById('rmap-preset-select').value = rmapState.worldPresetKey;
        }
    }

    var _regenerationTimeout = null;
    function debouncedRegen() {
        if (_regenerationTimeout) clearTimeout(_regenerationTimeout);
        _regenerationTimeout = setTimeout(function() {
            _regenerationTimeout = null;
            rmapState.terrainParams = readTerrainParams();
            rmapState.worldPresetKey = '-1';
            document.getElementById('rmap-preset-select').value = '-1';
            generateFullTerrain();
        }, 250);
    }

    document.querySelectorAll('#rmap-terrain-style-bar .rmap-style-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var style = parseInt(this.getAttribute('data-style'));
            if (rmapState.terrainStyle === style) return;
            rmapState.terrainStyle = style;
            updateTerrainStyleButtons();
            resetParamsForStyle(style);
            if (rmapState.mapMode === 1) { generateFullTerrain(); }
        });
    });

    ['param-land-ratio','param-mountain','param-forest','param-aridity','param-frag','param-coast'].forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', function() {
            updateParamLabels();
            rmapState.worldPresetKey = '-1';
            document.getElementById('rmap-preset-select').value = '-1';
            if (rmapState.mapMode === 1) { debouncedRegen(); }
        });
        el.addEventListener('change', function() {
            updateParamLabels();
        });
    });

    document.getElementById('rmap-preset-select').addEventListener('change', function() {
        var val = this.value;
        if (val === '-1') return;
        var worldName = PRESET_KEY_TO_WORLD[val];
        if (!worldName) return;
        applyWorldPreset(worldName);
        if (rmapState.mapMode === 1) { generateFullTerrain(); }
    });

    document.getElementById('btn-rmap-params-reset').addEventListener('click', function() {
        resetParamsForStyle(rmapState.terrainStyle);
        if (rmapState.mapMode === 1) { generateFullTerrain(); }
    });

    function resetRmapScreen() {
        rmapState.selectedWorldName = '';
        rmapState.oceanColor = '#0a2640';
        rmapState.mapMode = 1;
        rmapState.terrainStyle = 0;
        rmapState.terrainParams = { landRatio: 35, mountainStrength: 50, forestDensity: 50, aridity: 50, fragmentation: 50, coastComplexity: 50 };
        rmapState.worldPresetKey = '-1';
        document.getElementById('btn-rmap-mode-blob').classList.remove('active');
        document.getElementById('btn-rmap-mode-pixel').classList.add('active');
        document.querySelector('.rmap-size-controls').style.display = 'none';
        updateTerrainUI();
        updateTerrainStyleButtons();
        clearMap();
        rmapState.modules = [];
        renderModuleList();
        document.getElementById('rmap-map-info').textContent = '\u9009\u62E9\u6A21\u5757\u540E\u70B9\u51FB\u5730\u56FE\u653E\u7F6E\uFF0C\u6216\u76F4\u63A5\u62D6\u62FD\u6A21\u5757\u5230\u5730\u56FE';
    }

    // ---- Event handlers ----
    document.getElementById('btn-rmap-mode-blob').addEventListener('click', function() {
        if (rmapState.mapMode === 0) return;
        rmapState.mapMode = 0;
        document.getElementById('btn-rmap-mode-blob').classList.add('active');
        document.getElementById('btn-rmap-mode-pixel').classList.remove('active');
        document.querySelector('.rmap-size-controls').style.display = '';
        updateTerrainUI();
        clearMap();
        rmapState.modules = [];
        renderModuleList();
    });

    document.getElementById('btn-rmap-mode-pixel').addEventListener('click', function() {
        if (rmapState.mapMode === 1) return;
        rmapState.mapMode = 1;
        document.getElementById('btn-rmap-mode-pixel').classList.add('active');
        document.getElementById('btn-rmap-mode-blob').classList.remove('active');
        document.querySelector('.rmap-size-controls').style.display = 'none';
        updateTerrainUI();
        clearMap();
        rmapState.modules = [];
        renderModuleList();
    });

    document.getElementById('btn-rmap-gen-modules').addEventListener('click', function() {
        generateModules();
    });

    document.getElementById('btn-rmap-auto-fill').addEventListener('click', function() {
        if (!rmapState.modules.length) generateModules();
        autoFillAll();
    });

    document.getElementById('btn-rmap-full-gen').addEventListener('click', function() {
        generateFullTerrain();
    });

    document.getElementById('btn-rmap-clear').addEventListener('click', function() {
        clearMap();
    });

    document.getElementById('btn-rmap-place-random').addEventListener('click', function() {
        if (rmapState.selectedModuleIdx < 0) return;
        var mx = 60 + Math.random() * (MAP_W - 120);
        var my = 60 + Math.random() * (MAP_H - 120);
        placeModuleOnMap(rmapState.selectedModuleIdx, mx, my);
    });

    document.getElementById('btn-rmap-back').addEventListener('click', function() {
        showScreen(worldScreen);
    });

    document.getElementById('btn-rmap-continue').addEventListener('click', function() {
        if (!rmapState.generated) return;
        var data = {
            selectedWorldName: rmapState.selectedWorldName,
            oceanColor: rmapState.oceanColor,
            regions: [],
            mapW: MAP_W,
            mapH: MAP_H
        };
        if (fullTerrainData) {
            var fd = fullTerrainData;
            var flatRM = [], flatH = [], flatM = [];
            for (var y = 0; y < fd.cellsH; y++) {
                for (var x = 0; x < fd.cellsW; x++) {
                    flatRM.push(fd.regionMap[y][x]);
                    flatH.push(fd.heightmap[y][x]);
                    flatM.push(fd.moisture[y][x]);
                }
            }
            data.terrain = {
                cellsW: fd.cellsW, cellsH: fd.cellsH,
                seaLevel: fd.seaLevel,
                regionMap: flatRM,
                heightmap: flatH,
                moisture: flatM
            };
            data.cities = [];
            for (var ci = 0; ci < fd.cities.length; ci++) {
                data.cities.push({ mapX: fd.cities[ci].mapX, mapY: fd.cities[ci].mapY });
            }
        }
        for (var i = 0; i < rmapState.placedRegions.length; i++) {
            var r = rmapState.placedRegions[i];
            var regData = {
                name: r.name,
                renderType: r.renderType,
                labelX: r.labelX,
                labelY: r.labelY
            };
            if (r.renderType === 'pixel') {
                regData.pixelW = r.pixelW;
                regData.pixelH = r.pixelH;
                regData.shape = r.shape;
                regData.offsetX = r.offsetX;
                regData.offsetY = r.offsetY;
                regData.color = r.color;
            } else {
                regData.path = r.path;
            }
            data.regions.push(regData);
        }
        if (!data.cities) data.cities = [];
        for (var i = 0; i < rmapState.placedRegions.length; i++) {
            var r = rmapState.placedRegions[i];
            if (r.cities && r.cities.length) {
                for (var ci = 0; ci < r.cities.length; ci++) {
                    data.cities.push(r.cities[ci]);
                }
            }
        }
        window.__RANDOM_MAP_DATA__ = data;
        if (transitionON) {
            showRandomTip();
            showScreen(loadingScreen);
            setTimeout(function() {
                showScreen(talentScreen);
            }, 2000);
        } else {
            showScreen(talentScreen);
        }
    });

    function setupOriginalGameTooltip() {
        var tip = document.getElementById('game-terrain-tooltip');
        if (!tip) {
            tip = document.createElement('div');
            tip.id = 'game-terrain-tooltip';
            tip.className = 'game-terrain-tooltip';
            document.body.appendChild(tip);
        }
        var gameSvg = document.querySelector('#game-map-inner .world-map');
        if (!gameSvg) return;
        gameSvg.removeEventListener('mousemove', gameSvg._origTipMove);
        gameSvg.removeEventListener('mouseleave', gameSvg._origTipLeave);
        var moveHandler = function(e) {
            if (gameSelectMode !== 'region') { tip.style.display = 'none'; return; }
            var group = e.target;
            while (group && group !== gameSvg && !(group.classList && group.classList.contains('map-region-group'))) {
                group = group.parentNode;
            }
            if (!group || group === gameSvg) { tip.style.display = 'none'; return; }
            var rect = gameSvg.getBoundingClientRect();
            var sx = 1254 / rect.width;
            var sy = 369 / rect.height;
            var mx = (e.clientX - rect.left) * sx;
            var my = (e.clientY - rect.top) * sy;
            var terrain = terrainLabelForOriginalRegion(group.id, mx, my);
            if (!terrain) { tip.style.display = 'none'; return; }
            tip.textContent = terrain;
            tip.style.display = '';
            tip.style.left = (e.clientX + 14) + 'px';
            tip.style.top = (e.clientY + 14) + 'px';
        };
        var leaveHandler = function() { tip.style.display = 'none'; };
        gameSvg._origTipMove = moveHandler;
        gameSvg._origTipLeave = leaveHandler;
        gameSvg.addEventListener('mousemove', moveHandler);
        gameSvg.addEventListener('mouseleave', leaveHandler);
    }

    function bindOriginalMapRegions() {
        var mapRegions = document.querySelectorAll('#map-area .map-region-group');
        var mapContinueBtn = document.getElementById('btn-map-continue');
        mapRegions.forEach(function(region) {
            region.removeEventListener('click', region._omapClick);
            var handler = function() {
                mapRegions.forEach(function(r) { r.classList.remove('selected'); });
                region.classList.add('selected');
                mapContinueBtn.classList.add('visible');
            };
            region._omapClick = handler;
            region.addEventListener('click', handler);
        });
    }

    function bindOriginalGameRegions() {
        var gameRegions = document.querySelectorAll('#game-map-inner .map-region-group');
        gameRegions.forEach(function(region) {
            region.removeEventListener('click', region._ogameClick);
            var handler = function(e) {
                e.stopPropagation();
                gameRegions.forEach(function(r) { r.classList.remove('selected'); });
                region.classList.add('selected');

                var infected = Math.floor(Math.random() * 60) + 5;
                var dead = Math.floor(Math.random() * 20) + 1;
                var healthy = 100 - infected - dead;

                var name = regionNames[region.id] || region.id;
                var txt = name + ' \u2014 \u5DF2\u611F\u67D3 ' + infected + '% / \u5065\u5EB7 ' + healthy + '% / \u6B7B\u4EA1 ' + dead + '%';
                _gameSavedRegionText = txt;
                progressText.textContent = txt;
                segInfected.style.width = infected + '%';
                segHealthy.style.width = healthy + '%';
                segDead.style.width = dead + '%';
            };
            region._ogameClick = handler;
            region.addEventListener('click', handler);
        });
    }

    // Integrate generated map into screen-map
    function renderGeneratedMapToScreen() {
        var data = window.__RANDOM_MAP_DATA__;
        if (!data || !data.regions) return;

        var mapTitle = document.querySelector('#screen-map .title');
        mapTitle.textContent = data.selectedWorldName || '\u968F\u673A\u5730\u56FE';

        var mapArea = document.getElementById('map-area');
        var svgHtml = '<svg class="world-map" viewBox="0 0 ' + data.mapW + ' ' + data.mapH + '" xmlns="http://www.w3.org/2000/svg">';
        svgHtml += '<defs><filter id="map-glow-screen" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#C41E3A" flood-opacity="0.5"/></filter></defs>';
        svgHtml += '<rect width="' + data.mapW + '" height="' + data.mapH + '" fill="#0a0a0a"/>';

        if (data.terrain && data.terrain.heightmap) {
            var imgUrl = generateTerrainImageFromData(data);
            svgHtml += '<image href="' + imgUrl + '" width="' + data.mapW + '" height="' + data.mapH + '"/>';
            var bufs = buildInteractionHTML(data);
            for (var i = 0; i < data.regions.length; i++) {
                var r = data.regions[i];
                svgHtml += '<g class="map-region-group" id="rmap-sregion-' + i + '">';
                svgHtml += bufs[i];
                svgHtml += '<text class="map-label" x="' + r.labelX + '" y="' + r.labelY +
                           '" text-anchor="middle" dominant-baseline="central" pointer-events="none">' + r.name + '</text>';
                svgHtml += '</g>';
            }
        } else {
            for (var i = 0; i < data.regions.length; i++) {
                var r = data.regions[i];
                svgHtml += '<g class="map-region-group" id="rmap-sregion-' + i + '">';
                if (r.renderType === 'pixel') {
                    for (var py = 0; py < r.pixelH; py++) {
                        for (var px = 0; px < r.pixelW; px++) {
                            if (r.shape[py] && r.shape[py][px]) {
                                svgHtml += '<rect class="map-region" x="' + (r.offsetX + px * PIXEL_CELL) +
                                           '" y="' + (r.offsetY + py * PIXEL_CELL) + '" width="' + (PIXEL_CELL + 0.3) +
                                           '" height="' + (PIXEL_CELL + 0.3) + '" data-gen="1" fill="' + (r.color || '#3a6c2f') + '" stroke="none"/>';
                            }
                        }
                    }
                } else {
                    svgHtml += '<path class="map-region" data-name="' + r.name + '" d="' + r.path + '"/>';
                }
                svgHtml += '<text class="map-label" x="' + r.labelX + '" y="' + r.labelY +
                           '" text-anchor="middle" dominant-baseline="central" pointer-events="none">' + r.name + '</text>';
                svgHtml += '</g>';
            }
        }
        svgHtml += buildCitiesHTML(data);
        svgHtml += '</svg>';
        mapArea.innerHTML = svgHtml;

        bindGeneratedMapRegions();
        bindCityClicks('map-area');
        screenMapNeedsRebind = false;
    }

    function bindCityClicks(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var cities = container.querySelectorAll('.rmap-city');
        cities.forEach(function(city) {
            city.removeEventListener('click', city._cityClick);
            var handler = function(e) {
                if (containerId === 'game-map-inner' && gameSelectMode !== 'city') { e.stopPropagation(); return; }
                e.stopPropagation();
                var idx = parseInt(city.getAttribute('data-city'));
                city.classList.toggle('rmap-city-selected');
            };
            city._cityClick = handler;
            city.addEventListener('click', handler);
        });
    }

    function bindGeneratedMapRegions() {
        var mapRegions = document.querySelectorAll('#map-area .map-region-group');
        var mapContinueBtn = document.getElementById('btn-map-continue');
        mapRegions.forEach(function(region) {
            region.removeEventListener('click', region._rmapClick);
            var handler = function() {
                mapRegions.forEach(function(r) { r.classList.remove('selected'); });
                region.classList.add('selected');
                mapContinueBtn.classList.add('visible');
            };
            region._rmapClick = handler;
            region.addEventListener('click', handler);
        });
    }

    // Integrate generated map into game screen
    function renderGeneratedMapToGame() {
        var data = window.__RANDOM_MAP_DATA__;
        if (!data || !data.regions) return;

        var gameMapArea = document.getElementById('game-map-area');
        var oceanColor = data.oceanColor || '#0a2640';
        gameMapArea.style.backgroundColor = oceanColor;

        var svgHtml = '<svg class="world-map" viewBox="0 0 ' + data.mapW + ' ' + data.mapH + '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">';
        svgHtml += '<defs><filter id="map-glow-game" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#C41E3A" flood-opacity="0.5"/></filter></defs>';
        svgHtml += '<rect width="' + data.mapW + '" height="' + data.mapH + '" fill="' + oceanColor + '"/>';

        var gameRegionNames = {};

        if (data.terrain && data.terrain.heightmap) {
            var imgUrl = generateTerrainImageFromData(data);
            svgHtml += '<image href="' + imgUrl + '" width="' + data.mapW + '" height="' + data.mapH + '"/>';
            var bufs = buildInteractionHTML(data);
            for (var i = 0; i < data.regions.length; i++) {
                var r = data.regions[i];
                var regionId = 'rmap-gregion-' + i;
                gameRegionNames[regionId] = r.name;
                svgHtml += '<g class="map-region-group" id="' + regionId + '">';
                svgHtml += bufs[i];
                svgHtml += '</g>';
            }
        } else {
            for (var i = 0; i < data.regions.length; i++) {
                var r = data.regions[i];
                var regionId = 'rmap-gregion-' + i;
                gameRegionNames[regionId] = r.name;
                svgHtml += '<g class="map-region-group" id="' + regionId + '">';
                if (r.renderType === 'pixel') {
                    for (var py = 0; py < r.pixelH; py++) {
                        for (var px = 0; px < r.pixelW; px++) {
                            if (r.shape[py] && r.shape[py][px]) {
                                svgHtml += '<rect class="map-region" x="' + (r.offsetX + px * PIXEL_CELL) +
                                           '" y="' + (r.offsetY + py * PIXEL_CELL) + '" width="' + (PIXEL_CELL + 0.3) +
                                           '" height="' + (PIXEL_CELL + 0.3) + '" data-gen="1" fill="' + (r.color || '#3a6c2f') + '" stroke="none"/>';
                            }
                        }
                    }
                } else {
                    svgHtml += '<path class="map-region" d="' + r.path + '"/>';
                }
                svgHtml += '</g>';
            }
        }
        svgHtml += buildCitiesHTML(data);
        svgHtml += '</svg>';

        var inner = document.getElementById('game-map-inner');
        inner.innerHTML = svgHtml;
        gameZoomLevel = 1.0;

        var gameSvg = inner.querySelector('svg');
        var tip = document.getElementById('game-terrain-tooltip');
        if (!tip) {
            tip = document.createElement('div');
            tip.id = 'game-terrain-tooltip';
            tip.className = 'game-terrain-tooltip';
            document.body.appendChild(tip);
        }
        if (gameSvg) {
            gameSvg.addEventListener('mousemove', function(e) {
                if (gameSelectMode !== 'region') { tip.style.display = 'none'; return; }
                var d = window.__RANDOM_MAP_DATA__;
                if (!d || !d.terrain || !d.terrain.heightmap) { tip.style.display = 'none'; return; }
                var t = d.terrain;
                var rect = gameSvg.getBoundingClientRect();
                var sx = d.mapW / rect.width;
                var sy = d.mapH / rect.height;
                var mx = (e.clientX - rect.left) * sx;
                var my = (e.clientY - rect.top) * sy;
                var cx = Math.floor(mx / PIXEL_CELL);
                var cy = Math.floor(my / PIXEL_CELL);
                if (cx >= 0 && cx < t.cellsW && cy >= 0 && cy < t.cellsH) {
                    var idx = cy * t.cellsW + cx;
                    tip.textContent = terrainLabel(t.heightmap[idx], t.moisture[idx]);
                    tip.style.display = '';
                    tip.style.left = (e.clientX + 12) + 'px';
                    tip.style.top = (e.clientY + 12) + 'px';
                } else {
                    tip.style.display = 'none';
                }
            });
            gameSvg.addEventListener('mouseleave', function() {
                tip.style.display = 'none';
            });
        }
        inner.style.transform = '';
        updateZoomUI();

        window.__GAME_REGION_NAMES__ = gameRegionNames;

        bindGeneratedGameRegions();
        bindCityClicks('game-map-inner');
        gameMapNeedsRebind = false;
    }

    function bindGeneratedGameRegions() {
        var gameRegions = document.querySelectorAll('#game-map-inner .map-region-group');
        var regionNames = window.__GAME_REGION_NAMES__ || {};
        gameRegions.forEach(function(region) {
            region.removeEventListener('click', region._grmapClick);
            var handler = function(e) {
                if (gameSelectMode !== 'region') { e.stopPropagation(); return; }
                e.stopPropagation();
                gameRegions.forEach(function(r) { r.classList.remove('selected'); });
                region.classList.add('selected');

                var infected = Math.floor(Math.random() * 60) + 5;
                var dead = Math.floor(Math.random() * 20) + 1;
                var healthy = 100 - infected - dead;

                var name = regionNames[region.id] || region.id;
                var txt = name + ' \u2014 \u5DF2\u611F\u67D3 ' + infected + '% / \u5065\u5EB7 ' + healthy + '% / \u6B7B\u4EA1 ' + dead + '%';
                _gameSavedRegionText = txt;
                progressText.textContent = txt;
                segInfected.style.width = infected + '%';
                segHealthy.style.width = healthy + '%';
                segDead.style.width = dead + '%';
            };
            region._grmapClick = handler;
            region.addEventListener('click', handler);
        });
    }

    // Reset generated map binding when returning to normal flow
    var gameMapNeedsRebind = false;
    var screenMapNeedsRebind = false;

    var origShowScreen = showScreen;
    showScreen = function(target) {
        origShowScreen(target);
        if (target === mapScreen) {
            if (window.__RANDOM_MAP_DATA__) {
                renderGeneratedMapToScreen();
            } else if (screenMapNeedsRebind) {
                bindOriginalMapRegions();
                screenMapNeedsRebind = false;
            }
        }
        if (target === gameScreen) {
            if (window.__RANDOM_MAP_DATA__) {
                renderGeneratedMapToGame();
            } else {
                if (gameMapNeedsRebind) {
                    bindOriginalGameRegions();
                    gameMapNeedsRebind = false;
                }
                setupOriginalGameTooltip();
            }
            updateGameTime();
        }
    };

    // ============================================================
    // GAME MAP ZOOM SYSTEM
    // ============================================================
    var gameZoomLevel = 1.0;
    var ZOOM_MIN = 0.5;
    var ZOOM_MAX = 3.0;
    var ZOOM_STEP = 0.25;
    var gameSelectMode = 'region';
    var _gameSavedRegionText = '';

    function updateSelectModeUI() {
        var btns = document.querySelectorAll('#game-select-mode .game-mode-btn');
        btns.forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-gmode') === gameSelectMode);
        });
        var gameMapArea = document.getElementById('game-map-area');
        if (gameMapArea) {
            gameMapArea.classList.toggle('select-city', gameSelectMode === 'city');
        }
    }

    function updateZoomUI() {
        var levelEl = document.getElementById('game-zoom-level');
        var zoomWrap = document.getElementById('game-map-inner');
        levelEl.textContent = Math.round(gameZoomLevel * 100) + '%';
        zoomWrap.style.transform = 'scale(' + gameZoomLevel + ')';
    }

    document.getElementById('btn-zoom-in').addEventListener('click', function() {
        if (gameZoomLevel >= ZOOM_MAX) return;
        gameZoomLevel = Math.min(ZOOM_MAX, gameZoomLevel + ZOOM_STEP);
        updateZoomUI();
    });

    document.getElementById('btn-zoom-out').addEventListener('click', function() {
        if (gameZoomLevel <= ZOOM_MIN) return;
        gameZoomLevel = Math.max(ZOOM_MIN, gameZoomLevel - ZOOM_STEP);
        updateZoomUI();
    });

    document.getElementById('btn-zoom-reset').addEventListener('click', function() {
        gameZoomLevel = 1.0;
        updateZoomUI();
    });

    var gameModeBtns = document.querySelectorAll('#game-select-mode .game-mode-btn');
    gameModeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            gameSelectMode = btn.getAttribute('data-gmode');
            updateSelectModeUI();
            var gameMapArea = document.getElementById('game-map-area');
            if (gameMapArea) {
                gameMapArea.classList.toggle('select-city', gameSelectMode === 'city');
            }
            var inner = document.getElementById('game-map-inner');
            if (inner) {
                inner.querySelectorAll('.map-region-group.selected').forEach(function(r) { r.classList.remove('selected'); });
                inner.querySelectorAll('.rmap-city-selected').forEach(function(c) { c.classList.remove('rmap-city-selected'); });
            }
        });
    });

    // Initialize random map screen on first load
    resetRmapScreen();

    showStart();
})();
