/*

ok i dont know what im doing
this is supposed to be a game
but also a learning experience
at the same time so like yeah.

should be fun.

Made by Garret Gustavo "G Dinero" Gallion

Started     on 2018-01-12
Finishedish on 2018-03-11 at 4:50 AM GOOD MORNING.



how to make money:
- clean houses
- construction
- thief steal (chacne of getting caught and losing ur stuff)
^ never emplemnted cry i cry





the idea is that you are a colombian living in maracaibo traveling to maturín
where you plan to attend a football match between colombia
and venezuela at the Estado Monumental de Maturín
but you have like no money and you also want to check out
venezuela so you travel through some of the biggest cities
in venezuela where you learn about venezuela culture in the
cities and such and you also have to do some jobs and possibly
some jobs are unique to the place you are in.

the catch to working is that you have a specified amount of time
to get to the game in maturín and such you have to manage your time
and you also have to sleep and eat and entertain yourself and yeah

fun.


*/

// things that i didnt make
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

// by stackoverflow user 236139 (Reid)
Array.prototype.move = function (old_index, new_index) {
	if (new_index >= this.length) {
		var k = new_index - this.length;
		while ((k--) + 1) {
			this.push(undefined);
		}
	}
	this.splice(new_index, 0, this.splice(old_index, 1)[0]);
	return this; // for testing purposes
};

// misc
var dates = [
	['enero','febrario','marzo','abril','mayo','junio','julio','agusto','septiembre','octubre','noviembre','deciembre'],
	['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
];
// player
var player = {
	name: "Maximum of 25 characters.",
	money: 200,
	currentday: '2017-05-03',
	gameday: '2017-07-17',
	stage: 0,
	dayleft: 1,
	answer: 0,
	traveln: 0,
	car: [false, false, 0, false], // purchased, broken, repair cost, notified
	stats: {
		moneyEarned: 0,
		moneySpent: 0,
		moneyLossed: 0,
		days: [0,0,0,0,0,0],
		ontime: true,
		sleep: [0,0,0,0,0,0],
		timesRobbed: 0,
		jobsWorked: 0,
		car: {
			bought: false,
			accidents: 0
		},
		casino: {
			moneyBetted: 0,
			moneyWon: 0,
			slots: {
				jackpots: 0,
				spins: 0
			},
			blackjack: {
				blackjacks: 0,
				handsWon: 0,
				handsLoss: 0
			}
		}
		
	},
	update: function () {
		
		ele.name.innerHTML = player.name;
		document.getElementById("casinoPlayerMoney").innerHTML = ele.money.innerHTML = (player.money.toString().indexOf('.') == -1) ? player.money.toString() + '.00' : (player.money.toString().substr(player.money.toString().indexOf('.')).length == 3) ? player.money.toString() : player.money.toString() + "0";
		ele.currentday.innerHTML = (parseInt(player.currentday.substr(8,2)).toString() + " " + dates[0][parseInt(player.currentday.substr(5,2))-1] + " " + player.currentday.substr(0,4));
		ele.gameday.innerHTML = (parseInt(player.gameday.substr(8,2)).toString() + " " + dates[0][parseInt(player.gameday.substr(5,2))-1] + " " + player.gameday.substr(0,4));
		ele.daysleft.innerHTML = (((new Date(player.gameday + " 12:00")) - (new Date(player.currentday + " 12:00"))) / 1000 / 60 / 60 / 24) + " días";
	},
	gosleep: function (hotelsel) {
		if (player.money > city[player.stage][0][hotelsel][1] || hotelsel == 5) {
			if (confirm("¿Estás seguro de que tú quieres dormirse en el " + city[player.stage][0][hotelsel][0] + " para " + city[player.stage][0][hotelsel][1] + " bolívares?")) {
				player.stats.sleep[hotelsel]++;
				player.money -= city[player.stage][0][hotelsel][1];
				player.money = parseFloat(player.money.toFixed(2));
				player.stats.moneySpent += city[player.stage][0][hotelsel][1];
				player.stats.moneySpent = parseFloat(player.stats.moneySpent.toFixed(2));
				var nextday = new Date(new Date(player.currentday + " 12:00") - (-new Date(86400000)));
				player.currentday = nextday.getFullYear() + "-" + (nextday.getMonth() < 9 ? "0" + (nextday.getMonth()+1) : nextday.getMonth() + 1) + "-" + (nextday.getDate().toString().length == 1 ? "0" + nextday.getDate() : nextday.getDate());
				player.stats.days[player.stage]++;
				if (Math.random() < city[player.stage][0][hotelsel][3] && player.money >= 0) {
					var lostmoney = parseFloat((Math.random() * player.money).toFixed(2));
					alert("¡Te robó! Perdiste " + lostmoney + " bolívares.");
					player.money -= lostmoney;
					player.money = parseFloat(player.money.toFixed(2));
					player.stats.moneyLossed += lostmoney;
					player.stats.moneyLossed = parseFloat(player.stats.moneyLossed.toFixed(2));
					player.stats.timesRobbed++;
				}
				player.update();
				player.dayleft = 1;
				stage._dayleft();
				ele.stageDate.innerHTML = dates[1][nextday.getDay()] + ", " + (parseInt(player.currentday.substr(8,2)).toString() + " " + dates[0][parseInt(player.currentday.substr(5,2))-1] + " " + player.currentday.substr(0,4));
				paperFlip();
				stage._load();
				casino.init();
			}
		} else {
			alert("Tú necesitas " + (city[player.stage][0][hotelsel][1] - player.money) + " bolívares a dormirse aquí.");
		}
	},
	work: function (job, pay, btn) {
		if (player.dayleft >= city[player.stage][1][job][4]) {
			player.stats.jobsWorked++;
			player.dayleft -= city[player.stage][1][job][4];
			player.dayleft = parseFloat(player.dayleft.toFixed(2));// because computers cant do math hadstrihjknasrtkjl
			stage._dayleft();
			player.money += pay;
			player.money = parseFloat(player.money.toFixed(2));// aoeiuhiojegajgaioejiogaersr
			player.stats.moneyEarned += pay;
			player.stats.moneyEarned = parseFloat(player.stats.moneyEarned.toFixed(2));
			player.update();
		} else {
			alert("¡No hay bastante tiempo en el día ir este trabajo!");
		}
		btn.parentNode.style.opacity = "0";
		setTimeout(function () {
			document.getElementById("trabajos").removeChild(btn.parentNode);
			if (document.getElementById("trabajos").getElementsByClassName("stageSidebarInfo").length == 0) {
				document.getElementById("trabajos").innerHTML = "<div>¡No trabajo disponible!</div>";
			}
		}, 550);
	},
	travel: function (transportsel) {
		if (player.car[0] == true && transportsel == 3) transportsel++;
		if (player.money > city[player.stage][2][transportsel][1]) {
			totalcost_ = (transportsel != 4) ? city[player.stage][2][transportsel][1] : city[player.stage][2][transportsel][1] + player.car[2];
			if (confirm("¿Estás seguro de que tú quieres viajar en " + city[player.stage][2][transportsel][0] + " a " + ((player.stage != 4) ? cityname[player.stage+1] : "La partida bonita que es ¡¡¡FÚTBOL!!!") + " para " + totalcost_ + " bolívares?")) {
				player.money -= totalcost_;
				player.money = parseFloat(player.money.toFixed(2));
				player.stats.moneySpent += totalcost_;
				player.stats.moneySpent = parseFloat(player.stats.moneySpent.toFixed(2));
				if (transportsel == 4) {
					player.car = [true, false, 0, false];
				}
				var nextday = new Date(new Date(player.currentday + " 12:00") - (-new Date(city[player.stage][2][transportsel][2]*86400000)));
				player.currentday = nextday.getFullYear() + "-" + (nextday.getMonth() < 9 ? "0" + (nextday.getMonth()+1) : nextday.getMonth() + 1) + "-" + (nextday.getDate().toString().length == 1 ? "0" + nextday.getDate() : nextday.getDate());
				player.stats.days[5] += city[player.stage][2][transportsel][2];
				player.update();
				player.dayleft = 1;
				stage._dayleft();
				ele.stageDate.innerHTML = dates[1][nextday.getDay()] + ", " + (parseInt(player.currentday.substr(8,2)).toString() + " " + dates[0][parseInt(player.currentday.substr(5,2))-1] + " " + player.currentday.substr(0,4));
				stage._close();
				if (transportsel == 3) {
					player.car[0] = true;
					player.stats.car.bought = true;
					if (Math.floor(Math.random()*100) > 70) {
						player.car[1] = true;
						player.stats.car.accidents++;
						player.car[2] = Math.floor(Math.random() * 20000);
					}
				} else if (transportsel == 4) {
					if (Math.floor(Math.random()*100) > 70) {
						player.car[1] = true;
						player.stats.car.accidents++;
						player.car[2] = Math.floor(Math.random() * 20000);
					}
					
				}
				if (player.stage != 4) {
					document.getElementById("loadingscreenStage"+(player.stage+1)).style.display ="none";
					document.getElementById("loadingscreenStage"+(player.stage+2)).style.display ="block";
					ele.loadingscreen.style.display = "block";
					loadmusic("resources/loadingscreen.mp3");
					player.stage++;

				} else {
					setTimeout(function () {
						document.getElementById("stat-moneyEarned").innerHTML = player.stats.moneyEarned;
						document.getElementById("stat-moneySpent").innerHTML = player.stats.moneySpent;
						document.getElementById("stat-moneyLossed").innerHTML = player.stats.moneyLossed;
						document.getElementById("stat-timesRobbed").innerHTML = player.stats.timesRobbed;
						document.getElementById("stat-jobsWorked").innerHTML = player.stats.jobsWorked;
						document.getElementById("stat-carBought").innerHTML = player.stats.car.bought;
						document.getElementById("stat-carAccidents").innerHTML = player.stats.car.accidents;
						document.getElementById("stat-days0").innerHTML = player.stats.days[0];
						document.getElementById("stat-days1").innerHTML = player.stats.days[1];
						document.getElementById("stat-days2").innerHTML = player.stats.days[2];
						document.getElementById("stat-days3").innerHTML = player.stats.days[3];
						document.getElementById("stat-days4").innerHTML = player.stats.days[4];
						document.getElementById("stat-days5").innerHTML = player.stats.days[5];
						document.getElementById("stat-casinoMoneyWon").innerHTML = player.stats.casino.moneyWon;
						document.getElementById("stat-casinoJackpots").innerHTML = player.stats.casino.slots.jackpots;
						document.getElementById("stat-casinoSpins").innerHTML = player.stats.casino.slots.spins;
						document.getElementById("stat-casinoBlackjacks").innerHTML = player.stats.casino.blackjack.blackjacks;
						if (new Date(player.currentday) < new Date(player.gameday)) {
							document.getElementById("endscreenResult").innerHTML = "Sí";
						} else {
							document.getElementById("endscreenResult").innerHTML = "NO";
						}
						document.getElementById("endscreenDays").innerHTML = Math.floor(Math.abs(new Date(player.currentday) - new Date(player.gameday))/86400000);
						
						
						document.getElementById("endscreen").style.display = "block";
					}, 300);
				}
				casino.init();
				
			}
		} else {
			alert("Tú necesitas " + (city[player.stage][2][transportsel][1] - player.money) + " bolívares a dormirse aquí.");
		}
	},
	question: function (transportsel) {
		player.traveln = transportsel;
		document.getElementById("question").style.display = "block";
		var selectedQuestion = city[player.stage][5][Math.floor(Math.random()*city[player.stage][5].length)];
		var selectedQuestions = [selectedQuestion[1],selectedQuestion[2],selectedQuestion[3]]; //please garret why are you doing this
		var addd = selectedQuestions.length, bddd, cddd;
		while (0 !== addd) {
			cddd = Math.floor(Math.random() * addd);
			addd -= 1;
			bddd = selectedQuestions[addd];
			selectedQuestions[addd] = selectedQuestions[cddd];
			selectedQuestions[cddd] = bddd;
		}
		player.answer = selectedQuestions.indexOf(selectedQuestion[selectedQuestion[4]+1]);
		console.log(player.answer);
		document.getElementById("questionQuestion").innerHTML = selectedQuestion[0];
		document.getElementById("questionAnswer0").innerHTML = selectedQuestions[0];
		document.getElementById("questionAnswer1").innerHTML = selectedQuestions[1];
		document.getElementById("questionAnswer2").innerHTML = selectedQuestions[2];
	},
	questionAnswer: function (number) {
		if (number == player.answer) {
			document.getElementById("question").style.display = "none";
			player.travel(player.traveln);
			
		} else {
			document.getElementById("questionResponse").innerHTML = "LEA.";
			setTimeout(function () { document.getElementById("questionResponse").innerHTML = ""; document.getElementById("question").style.display = "none"; }, 3000 );
		}
	},
	savegame: function () {
		
	}
}

var cityname = [
	"Maracaibo",
	"Barquisimeto",
	"Caracas",
	"Barcelona",
	"Maturín"
];

var city = [
	[ // 0 (maracaibo)
		[ // 0 (hotels)
			["Hotel King", 250, 1, 0.8],
			["Hotel Acuario", 355, 2, 0.2],
			["Hotel Costa Real", 470, 3, 0.15],
			["Hotel Kristoff", 850, 4, 0.05],
			["Hotel Maruma", 1400, 5, 0],
			["La calle", 0, 0, 0.99]
		],
		[ // 1 job name              low    high  chance  time
			["Albañil",              800,   1500, 0.8,    1     ],
			["Paseador de perros",   200,    500, 0.2,    0.15  ],
			["Limpiador de la casa", 1200,  1600, 0.10,   0.75  ],
			["Traductor",            1800,  3000, 0.02,   0.25  ],
			["Dinero gratis",        1,     200,  0,      0     ]
		],
		[ // 2 (travel)
			["Andar", 1200, 25],
			["Autobs", 7800, 5],
			["Tren", 12200, 3],
			["Comprar un carro", 79999, 1],
			["Carro", 500, 1]
		],
		{ // 3 (casino stuff)
			inc: 50,
			seventeen: true
		},
		[ // 4 (local stuff)
			"Maracaibo",
			"<div class=\"stageHeader1\">La Tierra del Sol Amada</div><img id=\"stageImage1\" src=\"resources/stage-maracaibo1.jpg\" width=\"100%\" /><p>Qué vista a ver. Está es La Tierra del Sol Amada, también conocido como Maracaibo, una ciudad en Venezuela. Maracaibo es la capital del estadio de Zulia, la segunda ciudad más grande en Venezuela, con dos millones seiscientos mil personas. Los residentes en Maracaibo prefieren llamarse los marabinos, los maracaiberos, o los maracuchos. La ciudad se fundó en el siglo XVI.</p><p>Maracaibo no siempre fue la gran ciudad es hoy. Para cientos de años la ciudad estaba aislado y separado del país porque de su lago. Pero en 1958, un proyecto de gran dimensiones empezó. Venezuela iba a hacer un puente que cruzaría el lago de más cinco millas. Hacía cuarenta meses que tomaba construir, y el conectó Maracaibo con el país. El puente se llamó «El Puente De General Rafael Urdaneta», llamado por un héroe de Venezuela en el guerra de independencia de Venezuela.</p><p>Hoy, la ciudad es una targeta de los ciudadanos de Venezuela para refugio porque de razones politicos, culturales, y más importantamente, económicos en el resto del país. Mientras Maracaibo tiene sus propios problemas, es mejor en Maracaibo que en muchos otras ciudades en Venezuela. Maracaibo también tiene la mejor universidad de Venezuela, La Universidad de Zulia.</p><div class=\"stageHeader1\">Seguiridad en la Ciudad</div><p>Hay algunos cosas que ser consciente de si decides viajar a Maracaibo. El CDC de los Estados Unidos recomenda tener la vacuna de el typhoid y tener cuidado de la posibilidad de malaria. La ciudad también tiene muchas delincuencias y recomenda estar en grupos de personas leales y no utilizar ATMs con ningunas luces. Hay también muchos secuestros entonces no estar solo. No estar solo.</p>"
		],
		[ // 5 (travel questions)
			["¿Qué se llama el gente de Maracaibo?", "Los Marabinos", "Los Maracarabianos", "Los Maracaibísimos", 0],
			["¿Cuántos millas el puente cruza el lago?", "3 millas", "5 millas", "15 millas", 1],
			["¿Qué vacuna es recomenda por El CDC de los Estados Unidos antes de viajar a Maracaibo?", "la malaria", "el meningitis", "el typhoid", 2],
		]
	],
	[ // 1 (barquisimeto)
		[ // 0 (hotels)
			["Hotel Principe", 250, 1, 0.7],
			["Hotel Los Leones", 355, 2, 0.25],
			["Hostería El Obelisco", 560, 3, 0.15],
			["Hotel Jiraha", 1040, 4, 0.1],
			["Hotel Tiffany", 1800, 5, 0],
			["La calle", 0, 0, 0.99]
		],
		[ // 1 job name              low    high  chance  time
			["Albañil",               400,  1200, 0.8,    1    ],
			["Paseador de perros",    200,   500, 0.6,    0.15 ],
			["Limpiador de la casa",  900,  1400, 0.5,    0.75 ],
			["Guía",                  600,   800, 0.2,    0.10 ],
			["Enfermero",            1100,  1800, 0.1,    0.50 ],
			["Traductor",            2500,  3700, 0.02,   0.25 ],
			["Dinero gratis",           1,   400, 0,      0    ]
		],
		[ // 2 (travel)
			["Andar", 1600, 13],
			["Autobs", 10400, 3],
			["Tren", 17800, 2],
			["Comprar un carro", 129999, 1],
			["Carro", 650, 1]
		],
		{ // 3 (casino stuff)
			inc: 100,
			seventeen: true
		},
		[ // 4 (local stuff)
			"Barquisimeto",
			"<div class=\"stageHeader1\">Nueva Segovia de Barquisimeto</div><img id=\"stageImage1\" src=\"resources/stage-barquisimeto1.jpg\" width=\"100%\" /><p>Barquisimeto se fundó en 1552 como la sede para la area que Venezuela pensó tener muchos oros. La ciudad se llamaba Variquicimeto por las gentes nativas en el region. Barquisimeto tiene más o menos un millón personas, es la capital del estadio de Lara, y es la cuarta ciudad más grande en Venezuela. Barquisimeto se divide por la geografía.</p><p>Muchos del éxito de la ciudad es porque de su posición en el país. Barquisimeto se establece en el centro de las dos mitades de Venezuela, el este y oeste. Por esto, la ciudad consigue un parte grande del comercio y el viajo del país.</p><div class=\"stageHeader1\">Nueva Segovia de Barquisimeto</div><p>Desafortunadamente, como todos las otras ciudades en Venezuela, Barquisimeto tiene un mayor problema de crimen. Se recomienda que tú no viajas en la ciudad solo, especialmente en el noche. Algunos reportajes se dicen sin duda tú serás robado o peor. Pero la ciudad es bonita.</p>"
		],
		[ // 5 (travel questions)
			["¿Qué la ciudad se llamaba por las gentes nativas?", "Variquicimeto", "Barcelona", "Barquisimieto", 0],
			["¿Qué había pensado Venezuela que la area tuvo muchos de?", "Oro", "Diamentes", "Parrilladas",0],
			["¿Cuándo se fundó Barquisimeto?", "1552", "1255", "1525",0],
		]
	],
	[ // 2 (caracas)
		[ // 0 (hotels)
			["Hotel Alex", 345, 1, 0.8],
			["Hotel Avila", 875, 2, 0.2],
			["Costa Real", 1250, 3, 0.15],
			["JW Marriott", 1600, 4, 0.05],
			["Caracas Palace", 2600, 5, 0],
			["La calle", 0, 0, 0.99]
		],
		[ // 1 job name              low    high   chance  time
			["Albañil",              1800,  2800,  0.8,    1     ],
			["Paseador de perros",    800,  1200,  0.6,    0.15  ],
			["Limpiador de la casa", 2000,  2300,  0.5,    0.75  ],
			["Guía",                 1200,  1700,  0.2,    0.25  ],
			["Chef",                 2300,  2600,  0.1,    0.75  ],
			["Traductor",            3400,  4800,  0.02,   0.25  ],
			["Dinero gratis",           1,  1000,  0,      0     ]
		],
		[ // 2 (travel)
			["Andar", 2400, 13],
			["Autobs", 16400, 3],
			["Tren", 27800, 2],
			["Comprar un carro", 159999, 1],
			["Carro", 840, 1]
		],
		{ // 3 (casino stuff)
			inc: 200,
			seventeen: true
		},
		[ // 4 (local stuff)
			"Caracas",
			"<div class=\"stageHeader1\">La Capital de Venezuela</div><img id=\"stageImage1\" src=\"resources/stage-caracas1.jpg\" width=\"100%\" /><p>Bonita. La ciudad de Caracas, o Santiago de León de Caracas, es la capital y la ciudad más grande de Venezuela con más de cuatro millones de personas vivir en la ciudad. La ciudad se fundó en el siglo XVI como Maracaibo. En el comienzo, el fundador de la ciudad tratía de crear asentamientos en el área, pero había un problema con los indígenas no les gustan nuevos personas en su territorio y eventualmente los indígenas buscaron destruir los asentamientos. Pero España no tenía ningún parte de los indígenas, y después del esfuerzo despiadado de España contra de los, los indígenas finalmente abandonaron.</p><p>Caracas hizo un papel crucial en el surgimiento de la independencia de Venezuela. En el cinco de julio de 1811, La Declaración de Independencia de Venezuela escribió en Caracas. El año próximo Caracas sufrió de un terremoto que destruyó toda la ciudad, y con ése y la pérdida de la batalla de la Victoria, Venezuela perdió su guerra con España. Pero Venezuela siguió luchando, y dos más guerras luchó antes de Venezuela obtuvo su independencia.</p><p>Como el país, la economía de Caracas apoyó por el mercado de petróleo y su abundancia en el siglo XX. Durante este tiempo, la ciudad aumentó tremendamente. Petróleo se hizo el parte más grande de Venezuela y la empresa Petróleo de Venezuela, situado en Caracas, es ahora la empresa más grande en Venezuela.</p><div class=\"stageHeader1\">Seguiridad en la Ciudad</div><p>Caracas tiene uno de tasas de asesinatos más altas en el mundo. Hay muchos crimenes en la ciudad, pero los reportajes se dicen que es más seguro caminar solo en la noche en Caracas que Barquisimeto.</p>"
		],
		[ // 5 (travel questions)
			["¿Qué había escrito en 1811?", "La Declaración de Independencia de Venezuela", "Derrotas: por qué retroceden los gobiernos progresistas", "Una Revuelta de Ricos",0],
			["¿Cómo manejó España los indígenas?", "Muerte", "Ellos había negociado", "Ellos dio un sección de la ciudad",0],
			["¿Es más seguro caminar solo en la noche en Caracas o Barquisimeto?", "Caracas", "Barquisimeto", "No sé",0],
		]
	],
	[ // 3 (barcelona)
		[ // 0 (hotels)
			["Hotel Aqua Vi", 250, 1, 0.8],
			["Hotel Rasil", 355, 2, 0.2],
			["Hotel Punta Palma", 470, 3, 0.15],
			["Hotel Paradise Puerto la Cruz", 850, 4, 0.05],
			["Puerta Playa", 1400, 5, 0],
			["La calle", 0, 0, 0.99]
		],
		[ // 1 job name              low    high  chance  time
			["Albañil",              1800,  2800,  0.8,    1     ],
			["Paseador de perros",    800,  1200,  0.6,    0.15  ],
			["Limpiador de la casa", 2000,  2300,  0.5,    0.75  ],
			["Guía",                 1200,  1700,  0.2,    0.25  ],
			["Chef",                 2300,  2600,  0.1,    0.75  ],
			["Traductor",            3400,  4800,  0.02,   0.25  ],
			["Dinero gratis",           1,  1000,  0,      0     ]
		],
		[ // 2 (travel)
			["Andar", 3200, 13],
			["Autobs", 19400, 3],
			["Tren", 38800, 2],
			["Comprar un carro", 199999, 1],
			["Carro", 1200, 1]
		],
		{ // 3 (casino stuff)
			inc: 500,
			seventeen: true
		},
		[ // 4 (local stuff)
			"Barcelona",
			"<div class=\"stageHeader1\">No el Uno en España</div><img id=\"stageImage1\" src=\"resources/stage-barcelona1.jpg\" width=\"100%\" /><p>Barcelona de Venezuela se fundó en el siglo XVII. La ciudad es la capital de Anzoátegui. La ciudad es cerca del oceáno. La ciudad no es muy apasionante, y porque de la Barcelona en España mi investigación es dificíl, pero yo sé la tiene algunas aruitecturas bonitas.</p><img class='stageImageShowcase' src=\"resources/stage-barcelona2.jpg\" width=\"100%\" /><div class='stageImageCaption'>Ermita del Carmen Church</div><img class='stageImageShowcase' src=\"resources/stage-barcelona3.jpg\" width=\"100%\" /><div class='stageImageCaption'>Basílica de San José</div><img class='stageImageShowcase' src=\"resources/stage-barcelona4.jpg\" width=\"100%\" /><div class='stageImageCaption'>Puente Pasarella para el Estadio de Simon Bolívar</div><img class='stageImageShowcase' src=\"resources/stage-barcelona5.jpg\" width=\"100%\" /><div class='stageImageCaption'>Casa Fuerte, donde un masacre de 1600 personas por el Español tuvo lugar.</div>"
		],
		[ // 5 (travel questions)
			["¿Dónde es esta ciudad?", "España", "Venezuela", "Barcelona",1],
			["Yo ¿?¿? la ciudad de Barcelona", "me amo", "no me gusta", "me gusta",0],
			["¿Qué es la Casa Fuerte?", "Un casa que es fuerte", "Una parte importante de la historia de Barcelona de Venezuela", "Una parte desimportante de la historia de Barcelona de Venezuela",1],
		]
	],
	[ // 4 (maturin)
		[ // 0 (hotels)
			["Hotel Luciano Jr.", 670, 1, 0.8],
			["Hotel Monagas", 957, 2, 0.2],
			["Hotel Florencia", 1489, 3, 0.15],
			["Gran Hotel", 2578, 4, 0.05],
			["Hotel Satuffer", 4580, 5, 0],
			["La calle", 0, 0, 0.99]
		],
		[ // 1 job name              low    high  chance  time
			["Albañil",               800,  1200,  0.8,    1     ],
			["Paseador de perros",    200,   400,  0.6,    0.15  ],
			["Limpiador de la casa", 900,   1300,  0.5,    0.75  ],
			["Guía",                 300,    700,  0.2,    0.25  ],
			["Chef",                 1200,  1600,  0.1,    0.75  ],
			["Traductor",            3400,  4000,  0.008,   0.25  ],
			["Dinero gratis",        5000, 20000,  0,      0     ]
		],
		[ // 2 (travel)
			["Andar", 50000, 0],
			["Autobs", 50000, 0],
			["Tren", 50000, 0],
			["Comprar un carro", 999999, 0],
			["Carro", 1700, 0]
		],
		{ // 3 (casino stuff)
			inc: 1500,
			seventeen: true
		},
		[ // 4 (local stuff)
			"Maturín",
			"<div class=\"stageHeader1\">La Ciudad Distinta</div><img id=\"stageImage1\" src=\"resources/stage-maturin1.jpg\" width=\"100%\" /><p>Maturín, Venezuela es una ciudad bonita con más de cuatrocientas mil personas. Es la capital de Monagas y creyó ser «La Ciudad más limpia de Venezuela». La ciudad se fondó en el siglo XVIII pero hay controversia por quien actualmente fondarse la ciudad. Algunos creen que España lo hizo pero Venezuela atribue un misionero francés para el fundador de la ciudad. Pero hay aún más controversia con el nombre de la ciudad. Porque de la controversia de fondarse, quien Maturín fue en historia cambia de persona a persona. Algunos creen que fue un indígena que asesinó por un amigo de España, pero otros creen que Maturín es francés, y el nombre vino del mismo persona francés que creía ser el uno que se fondó la ciudad.</p><p>Maturín es la casa del Estadio Monumental de Maturín, el estadio más grande de todos de Venezuela. Colombia y Venezuela juega un partido de fútbol allí en el diez y siete de julio del 2017. "
		],
		[ // 5 (travel questions)
			["Maracaíbo es", "La Ciudad más limpia de Venezuela", "Un planeta", "La respuesta", 0],
			["¿Cuándo es el partido?", "17 de julio", "17 de junio", "17 de mayo", 0],
			["¿Cuándo se fondó la ciudad?", "El siglo XVIII", "El siglo XVII", "El siglo XXVIV", 0],
		]
	],
];

// elements
var ele = {
	panel: document.getElementById("panel"),
	panelToggle: document.getElementById("panelToggle"),
	panelContent: document.getElementById("panelContent"),
	start_title: document.getElementById("start_title"),
	startpage: document.getElementById("startpage"),
	loadingscreen: document.getElementById("loadingscreen"),
	loadingscreenContent: document.getElementById("loadingscreen-content"),
	startpageContent: document.getElementById("startpage-content"),
	enteryourname: document.getElementById("enteryourname"),
	name: document.getElementById("name"),
	money: document.getElementById("money"),
	currentday: document.getElementById("currentday"),
	gameday: document.getElementById("gameday"),
	daysleft: document.getElementById("daysleft"),
	bgmusic: document.getElementById("bgmusic"),
	stage: document.getElementById("stage"),
	stageContent: document.getElementById("stageContent"),
	stageDate: document.getElementById("stageDate"),
	casino: document.getElementById("casino"),
	blackjackDealer: document.getElementById("blackjackDealer"),
	blackjackPlayer: document.getElementById("blackjackPlayer"),
	
}

// center screen elements
var cord={x:window.innerWidth,y:window.innerHeight}
window.onresize=function(){cord={x:window.innerWidth,y:window.innerHeight}}



// disable selection thing and context menu I HATE IT BUT I NEEEEEEEEEEED IT
document.body.onselectstart = document.body.oncontextmenu = function () { return false }

// panel
ele.panelToggle.addEventListener("click", function () {
	if (ele.panelContent.style.display == "block") {
		ele.panelContent.style.display = "none";
	} else {
		ele.panelContent.style.display = "block";
	}
});

// background music
function loadmusic(thesrc) {
	ele.bgmusic.src = thesrc; ele.bgmusic.load();
}

// loadingbuttons
document.getElementById("loadingscreenButton1").addEventListener("click", stage1);
document.getElementById("loadingscreenButton2").addEventListener("click", stage2);
document.getElementById("loadingscreenButton3").addEventListener("click", stage3);
document.getElementById("loadingscreenButton4").addEventListener("click", stage4);
document.getElementById("loadingscreenButton5").addEventListener("click", stage5);

var stage = {
	_open: function () {
		ele.stageContent.style.width = "90%";
		ele.stageContent.style.height = (cord.y - 130) + "px";
		ele.stageContent.style.padding = "10px 25px";
		paperFlip();
	},
	_close: function () {
		ele.stageContent.style.width = "0px";
		ele.stageContent.style.height = "0px";
		ele.stageContent.style.padding = "0";
		paperFlip();
	},
	_load: function () {
		ele.stageContent.scrollTo(0,0);
		// localization (like the city stuff)
		document.getElementById("stageCity").innerHTML = city[player.stage][4][0];
		document.getElementById("stageStory").innerHTML = city[player.stage][4][1];
		
		// hotels
		for (var i = 0; i < 5; i++) {
			document.getElementById("hoteles").getElementsByClassName("stageHeader3")[i].innerHTML = city[player.stage][0][i][0];
			document.getElementById("hoteles").getElementsByClassName("stageHeader4")[i].innerHTML = "BsF. " + city[player.stage][0][i][1];
		}
		
		// travel
		document.getElementById("thenextcity").innerHTML = ((player.stage != 4) ? cityname[player.stage+1] : "La partida bonita que es ¡¡¡FÚTBOL!!!");
		for (var i = 0; i < 3; i++) {
			document.getElementById("travel").getElementsByClassName("stageHeader3")[i].innerHTML = city[player.stage][2][i][0];
			document.getElementById("travel").getElementsByClassName("stageHeader4")[i].innerHTML = "BsF. " + city[player.stage][2][i][1] +
																									"<br />" + city[player.stage][2][i][2] + " día" + 
																									(city[player.stage][2][i][2] == 1 ? "" : "s");
		}
		if (player.car[0]) {
			if (player.car[1]) {
				if (!player.car[3]) {
					alert("¡Oh no! Tú tenía una accidente con tu carro. Tú necesitas BsF." + player.car[2] + " más a viajar en carro de nuevo.");
					player.car[3] = true;
				}
				document.getElementById("travel").getElementsByClassName("stageHeader3")[i].innerHTML = city[player.stage][2][4][0];
				document.getElementById("travel").getElementsByClassName("stageHeader4")[i].innerHTML = "BsF. " + (city[player.stage][2][4][1]+player.car[2]); +
																										"<br />" + city[player.stage][2][i][2] + " día" + 
																										(city[player.stage][2][i][2] == 1 ? "" : "s");
			} else {
				document.getElementById("travel").getElementsByClassName("stageHeader3")[i].innerHTML = city[player.stage][2][4][0];
				document.getElementById("travel").getElementsByClassName("stageHeader4")[i].innerHTML = "BsF. " + city[player.stage][2][4][1];
			}
		} else {
			document.getElementById("travel").getElementsByClassName("stageHeader3")[i].innerHTML = city[player.stage][2][3][0];
			document.getElementById("travel").getElementsByClassName("stageHeader4")[i].innerHTML = "BsF. " + city[player.stage][2][3][1];
		}
		
		// jobs
		document.getElementById("trabajos").innerHTML = "";
		for (var i = Math.floor(Math.random() * 7); i < 8; i++) {
			var j, r = Math.random();
			// it just looks so elegant i dont want to delete it
			//if (city[player.stage][1][0][3] > r) {
			//	r -= city[player.stage][1][0][3];
			//	if (city[player.stage][1][1][3] > r) {
			//		r -= city[player.stage][1][1][3];
			//		if (city[player.stage][1][2][3] > r) {
			//			r -= city[player.stage][1][2][3];
			//			if (city[player.stage][1][3][3] > r) j = 4; else j = 3;
			//		} else j = 2;
			//	} else j = 1;
			//} else j = 0;
			if (r > city[player.stage][1][0][3]) j = 0;
			else if (r > city[player.stage][1][1][3]) j = 1;
			else if (r > city[player.stage][1][2][3]) j = 2;
			else if (r > city[player.stage][1][3][3]) j = 3;
			else j = 4;
			jmoney = ((city[player.stage][1][j][1]+(city[player.stage][1][j][2]-city[player.stage][1][j][1])*Math.random()).toFixed(2));
			document.getElementById("trabajos").innerHTML += '<div class="stageSidebarInfo"><div class="stageHeader3">' + city[player.stage][1][j][0] + 
															 '</div><div class="stageHeader4">BsF. ' + jmoney + 
															 '<br />Tiempo: ' + (city[player.stage][1][j][4]*100) + 
															 '%</div><button onclick="player.work(' + j + ', ' + jmoney + ', this)">Trabajar</button></div>';
		}
	},
	_dayleft: function () {
		document.getElementById("dayleft").innerHTML = (player.dayleft * 100).toFixed(2);
	}
}

function stage1() {
	loadmusic("resources/maracaibo.mp3");
	ele.loadingscreen.style.display = "none";
	stage._load();
	stage._open();
	casino.init();
}

function stage2() {
	loadmusic("resources/barquisimeto.mp3");
	ele.loadingscreen.style.display = "none";
	stage._load();
	stage._open();
	casino.init();
}

function stage3() {
	loadmusic("resources/caracas.mp3");
	ele.loadingscreen.style.display = "none";
	stage._load();
	stage._open();
	casino.init();
}

function stage4() {
	loadmusic("resources/barcelona.mp3");
	ele.loadingscreen.style.display = "none";
	stage._load();
	stage._open();
	casino.init();
}

function stage5() {
	loadmusic("resources/maturin.mp3");
	ele.loadingscreen.style.display = "none";
	stage._load();
	stage._open();
	casino.init();
}

function paperFlip() {
	if (ele.stageContent.style.transform == "rotate(1080deg)") ele.stageContent.style.transform = "rotate(0deg)";
	else ele.stageContent.style.transform = "rotate(1080deg)";
}

var casino = {
	games: [
		"Tragamonedas", //0 slots
		"Blackjack", //1 blackjack
		"Poker Video", //2 video poker
		"Baccarat", // 3 baccarat
		"Craps", // 4 Craps
		"Roulette" // 5 Roulette
	],
	init: function () {
		//slots
		
		// slots stuff
		casino.gameControl[0].betAmt = city[player.stage][3].inc;
		casino.gameControl[0].jackpot = Math.floor(1000*Math.random())*city[player.stage][3].inc;
		document.getElementById("slotsControlsApuesta").innerHTML = casino.gameControl[0].betAmt;
		document.getElementById("slotsJackpot").innerHTML = casino.gameControl[0].jackpot;
		//blackjack
		casino.gameControl[1].betAmt = city[player.stage][3].inc;
		document.getElementById("blackjackControlsApuesta").innerHTML = casino.gameControl[1].betAmt;
		casino.gameControl[1].current = [[],[],[[]],[[]]];
		casino.gameControl[1].decks = Math.floor(Math.random() * 8) + 1;
		casino.gameControl[1]._loadDeck();
		ele.blackjackPlayer.innerHTML = "";
		ele.blackjackDealer.innerHTML = "";
	},
	_openGame: function (current) {
		document.getElementById("casinoMain").style.display = "none";
		switch (current) {
			case 0:
				document.getElementById("casinoSlots").style.display = "block";
				break;
			case 1:
				document.getElementById("casinoBlackjack").style.display = "block";
				break;
		}
	},
	_open: function (aghs_r) { ele.casino.style.display = aghs_r ? "block" : "none" },
	_unloadGame: function (current) {
		switch (current) {
			case 0:
				document.getElementById("casinoSlots").style.display = "none";
				break;
			case 1:
				document.getElementById("casinoBlackjack").style.display = "none";
				break;
		}
		document.getElementById("casinoMain").style.display = "block";
	},
	gameControl: [
		{ // 0 slots
			betAmt: city[player.stage][3].inc,
			jackpot: Math.floor(1000*Math.random())*city[player.stage][3].inc,
			spinning: false,
			_spin: function () {
				if (player.money >= casino.gameControl[0].betAmt && !casino.gameControl[0].spinning) {
					player.stats.casino.slots.spins++;
					casino.gameControl[0].spinning = true;
					player.money -= casino.gameControl[0].betAmt;
					player.update();
					var backmoney = 0;
					var values = [0,0,0]; // 0=diamond 1=heart 2=horseshoe 3=lemon 4=seven 5=cherry 6=watermelon 7=bell 8=barbarbar
					console.log("hi");
					for (var i = 0; i < 3; i++) {
						document.getElementById("slotsMachineColumn"+i).style.background = "url('resources/images/slotsfast.gif')";
					}
					setTimeout(function () {
						values[0] = Math.floor(9*Math.random());
						document.getElementById("slotsMachineColumn0").style.background = "url('resources/images/sloticons.png') 0 " + (-(-55 + 55*values[0] + (Math.exp(-1,Math.floor(10*Math.random()))*(Math.floor(30*Math.random()))))) + "px";
						setTimeout(function () {
							values[1] = Math.floor(9*Math.random());
							document.getElementById("slotsMachineColumn1").style.background = "url('resources/images/sloticons.png') 0 " + (-(-55 + 55*values[1] + (Math.exp(-1,Math.floor(10*Math.random()))*(Math.floor(30*Math.random()))))) + "px";
							setTimeout(function () {
								values[2] = Math.floor(9*Math.random());
								document.getElementById("slotsMachineColumn2").style.background = "url('resources/images/sloticons.png') 0 " + (-(-55 + 55*values[2] + (Math.exp(-1,Math.floor(10*Math.random()))*(Math.floor(30*Math.random()))))) + "px";
								console.log(values);
								if ((values[0]==values[1])&&(values[1]==values[2])) {
									console.log("3 pair");
									switch (values[0]) {
										case 0: backmoney = 5*casino.gameControl[0].betAmt; break;
										case 1: backmoney = 3*casino.gameControl[0].betAmt; break;
										case 2: backmoney = 4*casino.gameControl[0].betAmt; break;
										case 3: backmoney = 2*casino.gameControl[0].betAmt; break;
										case 4: backmoney = casino.gameControl[0].jackpot;
												casino.gameControl[0].jackpot = 0;
												player.stats.casino.slots.jackpots++;       break;
										case 5: backmoney = 2*casino.gameControl[0].betAmt; break;
										case 6: backmoney = 2*casino.gameControl[0].betAmt; break;
										case 7: backmoney = 3*casino.gameControl[0].betAmt; break;
										case 8: backmoney = 4*casino.gameControl[0].betAmt; break;
									}
								} else if (values[0]==values[1] || values[1]==values[2] || values[0]==values[2]) {
									console.log("2 pair");
									values[0] = (values[0]==values[1] || values[0]==values[2]) ? values[0] : values[1];
									switch (values[0]) {
										case 0:backmoney = 2*casino.gameControl[0].betAmt;break;
										case 1:backmoney = 2*casino.gameControl[0].betAmt;break;
										case 2:backmoney = 2*casino.gameControl[0].betAmt;break;
										case 3:backmoney = 2*casino.gameControl[0].betAmt;break;
										case 4:backmoney = 5*casino.gameControl[0].betAmt;break;
										case 5:backmoney = 2*casino.gameControl[0].betAmt;break;
										case 6:backmoney = 2*casino.gameControl[0].betAmt;break;
										case 7:backmoney = 2*casino.gameControl[0].betAmt;break;
										case 8:backmoney = 2*casino.gameControl[0].betAmt;break;
									}
								}
								casino.gameControl[0].jackpot += Math.floor(10*Math.random())*city[player.stage][3].inc;
								document.getElementById("slotsJackpot").innerHTML = casino.gameControl[0].jackpot;
								console.log(backmoney);
								player.money += backmoney;
								player.money = parseFloat(player.money.toFixed(2));
								if (backmoney > city[player.stage][3].inc) {
									player.stats.casino.moneyWon = parseFloat((player.stats.casino.moneyWon+backmoney-city[player.stage][3].inc).toFixed(2));
									player.stats.moneyEarned = parseFloat((player.stats.moneyEarned+backmoney-city[player.stage][3].inc).toFixed(2));
								} else {
									player.stats.moneyLossed += parseFloat((player.stats.moneyLossed+city[player.stage][3].inc).toFixed(2));
									player.stats.casino.moneyLossed = parseFloat((player.stats.casino.moneyLossed+city[player.stage][3].inc).toFixed(2));
								}
								player.update();
								
								casino.gameControl[0].spinning = false;
							}, 500);
						}, 500);
					}, 1500);
				}
			}
		},
		{ // 1 blackjack
			// minimum raise is city[x][3].inc
			// seventeen is city[x][3].seventeen
			betAmt: city[player.stage][3][0],
			decks: 1,
			handActive: 0,
			cardnames: [
				[
					['2',2],['3',3],['4',4],['5',5],['6',6],['7',7],['8',8],['9',9],['10',10],['jack',10],['queen',10],['king',10],['ace',11]
				],
				[
					'spades','hearts','clubs','diamonds'
				]
			],
			current: [
				[ // 0 cards in deck
					
				],
				[ // 1 cards out of play
					
				],
				[ // 2 dealer cards
					[
						
					]
				],
				[ // 3 player cards
					[
						
					],false // stood
				],
			],
			_deal: function () {
				if (player.money >= casino.gameControl[1].betAmt) {
					casino.gameControl[1].current[2] = [[]];
					casino.gameControl[1].handActive = 0;
					casino.gameControl[1].current[3] = [[], false, casino.gameControl[1].betAmt];
					document.getElementById("blackjackControlsMenu").style.display = "none";
					var randomindex, cards;
					for(var i=0;i<2;i++){for(var j=0;j<2;j++){
						randomindex = Math.floor(casino.gameControl[1].current[0].length*Math.random());
						casino.gameControl[1].current[2+j][0].push(casino.gameControl[1].current[0][randomindex]);
						casino.gameControl[1].current[0].remove(randomindex);
						
					}}
					cards = [
						[casino.gameControl[1].current[3][0][0][0][0], casino.gameControl[1].current[3][0][0][1]],
						[casino.gameControl[1].current[3][0][1][0][0], casino.gameControl[1].current[3][0][1][1]],
						[casino.gameControl[1].current[2][0][1][0][0], casino.gameControl[1].current[2][0][1][1]]
					];
					ele.blackjackPlayer.innerHTML = "<div>Tú</div><div id='blackjackCardsPlayer'><div class='blackjackHand' style='border: 1px solid #ff0'>" +
													"<div class='blackjackCard' style='width: 0px;background-image: url(\"resources/images/cards/" +
													cards[0][0] + "_of_" + cards[0][1] + ".svg\")'></div>" +
													"<div class='blackjackCard' style='width: 0px;background-image: url(\"resources/images/cards/" +
													cards[1][0] + "_of_" + cards[1][1] + ".svg\")'></div>" +
													"</div><div class='blackjackApuesta'>Ap: <span class='blackjackBet'>" + casino.gameControl[1].betAmt + "</span></div></div>";
					ele.blackjackDealer.innerHTML = "<div>Dealer</div><div id='blackjackCardsDealer'><div class='blackjackHand'>" +
													"<div class='blackjackCard' style='width: 0px; background-image: url(\"resources/images/cards/back_card.svg\")'></div>" + 
													"<div class='blackjackCard' style='width: 0px;background-image: url(\"resources/images/cards/" + 
													cards[2][0] + "_of_" + cards[2][1] + ".svg\")'></div>" +
													"</div></div>";
					
					// elegant.
					setTimeout(function () {
						document.getElementsByClassName("blackjackCard")[0].style.width = "75px";
						setTimeout(function () {
							document.getElementsByClassName("blackjackCard")[2].style.width = "75px";
							setTimeout(function () {
								document.getElementsByClassName("blackjackCard")[1].style.width = "75px";
								setTimeout(function () {
									document.getElementsByClassName("blackjackCard")[3].style.width = "75px";
								}, 75);
							}, 75);
						}, 75);
					}, 1);
					casino.gameControl[1]._cardCount();
					document.getElementById("blackjackControlsGame").style.display = "block";
					console.log(casino.gameControl[1]._checkValue(true));
				} else {
					// error sorry not enough money
				}
			},
			_bet: function (bdir) {
				casino.gameControl[1].betAmt += (bdir ? city[player.stage][3].inc : (casino.gameControl[1].betAmt == city[player.stage][3].inc ? 0 : -city[player.stage][3].inc));
				document.getElementById("blackjackControlsApuesta").innerHTML = casino.gameControl[1].betAmt;
			},
			_hit: function (bplyr) {
				var randomindex,
					thehand_ = (bplyr ? casino.gameControl[1].handActive : 0),
					plyr_ = (bplyr ? 3 : 2),
					hand_ = document.getElementById((bplyr ? "blackjackPlayer" : "blackjackDealer")).getElementsByClassName("blackjackHand")[thehand_];
				randomindex = 0; //Math.floor(casino.gameControl[1].current[0].length*Math.random());
				casino.gameControl[1].current[plyr_][thehand_*3].push(casino.gameControl[1].current[0][randomindex]);
				casino.gameControl[1].current[0].remove(randomindex);
				hand_.innerHTML += "<div class='blackjackCard' style='width: 0px; background-image: url(\"resources/images/cards/" +
							casino.gameControl[1].current[plyr_][thehand_*3][casino.gameControl[1].current[plyr_][thehand_*3].length-1][0][0] + "_of_" +
							casino.gameControl[1].current[plyr_][thehand_*3][casino.gameControl[1].current[plyr_][thehand_*3].length-1][1] + ".svg\")'></div>";
				setTimeout(function () {hand_.getElementsByClassName("blackjackCard")[hand_.getElementsByClassName("blackjackCard").length-1].style.width = "75px"; }, 1);
				casino.gameControl[1]._cardCount();
				console.log(casino.gameControl[1]._checkValue(bplyr));
				if (bplyr) {
					casino.gameControl[1]._checkHandCount();
					if (casino.gameControl[1]._checkValue(true) > 21) {
						document.getElementById("blackjackControlsGame").style.display = "none";
						setTimeout(function () {
							hand_.parentNode.removeChild(hand_);
							casino.gameControl[1]._moneymanage(false,casino.gameControl[1].handActive);
							casino.gameControl[1].current[3].remove(casino.gameControl[1].handActive);
							casino.gameControl[1].current[3].remove(casino.gameControl[1].handActive);
							casino.gameControl[1].current[3].remove(casino.gameControl[1].handActive);
							casino.gameControl[1]._checkHandCount();
						}, 3000);
					}
				}
			},
			_stand: function () {
				casino.gameControl[1].current[3][casino.gameControl[1].handActive*3+1] = true;
				casino.gameControl[1]._checkHandCount();
				
			},
			_split: function () {
				if (casino.gameControl[1].current[3][casino.gameControl[1].handActive*3][casino.gameControl[1].current[3][casino.gameControl[1].handActive*3].length - 2][0][0] ==
				  casino.gameControl[1].current[3][casino.gameControl[1].handActive*3][casino.gameControl[1].current[3][casino.gameControl[1].handActive*3].length - 1][0][0]) {
					casino.gameControl[1].current[3].splice(casino.gameControl[1].handActive*3+3,0,[casino.gameControl[1].current[3][casino.gameControl[1].handActive*3][casino.gameControl[1].current[3][casino.gameControl[1].handActive*3].length - 1]]);
					casino.gameControl[1].current[3].splice(casino.gameControl[1].handActive*3+4,0,false);
					casino.gameControl[1].current[3].splice(casino.gameControl[1].handActive*3+5,0,casino.gameControl[1].current[3][casino.gameControl[1].handActive*3+2]);
					casino.gameControl[1].current[3][casino.gameControl[1].handActive*3].remove(casino.gameControl[1].current[3][casino.gameControl[1].handActive*3].length - 1);
					var relocated_ = ele.blackjackPlayer.getElementsByClassName("blackjackHand")[casino.gameControl[1].handActive*3].getElementsByClassName("blackjackCard");
						relocated_[relocated_.length-1].parentNode.removeChild(relocated_[relocated_.length-1]);
					var newhandy_ = document.createElement("div");
						newhandy_.setAttribute('class','blackjackHand');
						newhandy_.innerHTML = "<div class='blackjackCard' style='width: 0px;background-image: url(\"resources/images/cards/" +
														casino.gameControl[1].current[3][casino.gameControl[1].handActive*3+3][0][0][0] + "_of_" +
														casino.gameControl[1].current[3][casino.gameControl[1].handActive*3+3][0][1] + ".svg\")'></div>";
					var newhandy2_ = document.createElement("div");
						newhandy2_.setAttribute('class','blackjackApuesta');
						newhandy2_.innerHTML = "Ap: <span class='blackjackBet'>" + casino.gameControl[1].betAmt + "</span>";

					var newhandyE_ = document.getElementById("blackjackCardsPlayer").getElementsByClassName("blackjackApuesta")[casino.gameControl[1].handActive / 3];
						newhandyE_.parentNode.insertBefore(newhandy_,newhandyE_.nextSibling);
					var newhandyE2_ = document.getElementById("blackjackCardsPlayer").getElementsByClassName("blackjackHand")[(casino.gameControl[1].handActive+3) / 3];
						newhandyE2_.parentNode.insertBefore(newhandy2_,newhandyE2_.nextSibling);
					setTimeout(function () {newhandy_.getElementsByClassName("blackjackCard")[0].style.width = "75px"; }, 1);
				}
			},
			_double: function () {
				casino.gameControl[1].current[3][casino.gameControl[1].handActive+2] *= 2;
				casino.gameControl[1]._hit(true);
				casino.gameControl[1]._stand();
			},
			_reset: function () { // returns total shoe
				if (casino.gameControl[1].current[0].length < casino.gameControl[1].decks * 13) {
					casino.gameControl[1].current[0] = [];
					casino.gameControl[1]._loadDeck();
					
				}
			},
			_moneymanage: function (mdir, mhand, mall) {
				if (mall) {
					for (var i = 0; i < casino.gameControl[1].current[3].length; i+=3) {
						player.money += (mdir?1:-1)*casino.gameControl[1].current[3][i+2];
						player.money = parseFloat(player.money.toFixed(2));
						if (mdir) {
							player.stats.casino.blackjack.handsWon++;
							player.stats.casino.moneyWon = parseFloat((player.stats.casino.moneyWon+casino.gameControl[1].current[3][i+2]).toFixed(2));
							player.stats.moneyEarned = parseFloat((player.stats.moneyEarned+casino.gameControl[1].current[3][i+2]).toFixed(2));
						} else {
							player.stats.casino.blackjack.handsLoss++;
							player.stats.casino.moneyLossed = parseFloat((player.stats.casino.moneyLossed+casino.gameControl[1].current[3][i+2]).toFixed(2));
							player.stats.moneyLossed = parseFloat((player.stats.moneyLossed+casino.gameControl[1].current[3][i+2]).toFixed(2));
							
						}
					}
				} else {
					player.money += (mdir?1:-1)*casino.gameControl[1].current[3][mhand+2];
					player.money = parseFloat(player.money.toFixed(2));
				}
				player.update();
			},
			_doDealer: function () {
				handDealer_ = ele.blackjackDealer.getElementsByClassName("blackjackHand")[0];
				handDealer_.getElementsByClassName("blackjackCard")[0].style.backgroundImage =
					"url('resources/images/cards/" + casino.gameControl[1].current[2][0][0][0][0] + "_of_" + casino.gameControl[1].current[2][0][0][1] + ".svg";
				if (casino.gameControl[1]._checkValue(false) > casino.gameControl[1]._checkValue(true)) {
					console.log("game over lost all bets");
					casino.gameControl[1]._moneymanage(false, 0, true);
					setTimeout(function () { casino.gameControl[1]._checkHandCount(true) }, 3000);
				} else if (casino.gameControl[1]._checkValue(false) == casino.gameControl[1]._checkValue(true) && casino.gameControl[1]._checkValue(false) <= 21) {
					if (casino.gameControl[1]._checkValue(false) < 17) casino.gameControl[1]._doDealerHit();
					else console.log("game over returned all bets");
					setTimeout(function () { casino.gameControl[1]._checkHandCount(true) }, 3000);
				} else {
					casino.gameControl[1]._doDealerHit();
				}
				
			},
			_doDealerHit: function () {
				setTimeout(function () {
						casino.gameControl[1]._hit(false);
						if (casino.gameControl[1]._checkValue(false) > casino.gameControl[1]._checkValue(true) && casino.gameControl[1]._checkValue(false) <= 21) {
							console.log("game over lost all bets");
							casino.gameControl[1]._moneymanage(false, 0, true);
							setTimeout(function () { casino.gameControl[1]._checkHandCount(true) }, 3000);
						} else if (casino.gameControl[1]._checkValue(false) == casino.gameControl[1]._checkValue(true) && casino.gameControl[1]._checkValue(false) <= 21) {
							if (casino.gameControl[1]._checkValue(false) < 17) casino.gameControl[1]._doDealerHit();
							else console.log("game over returned all bets");
							setTimeout(function () { casino.gameControl[1]._checkHandCount(true) }, 3000);
						} else if (casino.gameControl[1]._checkValue(false) < 21) {
							casino.gameControl[1]._doDealerHit();
						} else {
							console.log("dealer lost AHAHAHAH!");
							casino.gameControl[1]._moneymanage(true, 0, true);
							setTimeout(function () { casino.gameControl[1]._checkHandCount(true) }, 3000);
						}
					}, 1000);
				casino.gameControl[1]._cardCount();
			},
			_checkHandCount: function (backtomenu) { // kind of ambiguous name. is the function to change current hand, trigger the dealer to reveal hole card, and to shut the game down if no more hands remain
				if (casino.gameControl[1].current[3].length == 0 || backtomenu) {
					document.getElementById("blackjackControlsMenu").style.display = "block";
					document.getElementById("blackjackControlsGame").style.display = "none";
					ele.blackjackDealer.innerHTML = "";
					ele.blackjackPlayer.innerHTML = "";
				} else {
					var newhand = -1;
					for (var i = 0; i < casino.gameControl[1].current[3].length; i+=3) {
						console.log("!casino.gameControl[1].current[3][i+1]: " + !casino.gameControl[1].current[3][i+1]);
						if (!casino.gameControl[1].current[3][i+1]) {console.log("ITS TRUE"); newhand = i/3;  break;}
					}
					if (newhand == -1) {
						console.log("its dealer time. newhand: " + newhand);
						casino.gameControl[1]._doDealer();
						document.getElementById("blackjackControlsGame").style.display = "none";
					} else {
						document.getElementById("blackjackPlayer").getElementsByClassName("blackjackHand")[casino.gameControl[1].handActive].style.border = "0";
						casino.gameControl[1].handActive = newhand;
						document.getElementById("blackjackPlayer").getElementsByClassName("blackjackHand")[casino.gameControl[1].handActive].style.border = "1px solid #ff0";
						document.getElementById("blackjackControlsGame").style.display = "block";
					}
				}
			},
			_checkValue: function (plyr) {
				var value_ = 0, aces_ = 0;
				if (plyr) {
					for (var i = 0; i < casino.gameControl[1].current[3][casino.gameControl[1].handActive].length; i++) {
						var ha5sash4_ = casino.gameControl[1].current[3][casino.gameControl[1].handActive][i];
						if (ha5sash4_[0][1] == 11) {
							value_ += 11; aces_ += 1;
						} else {
							value_ += ha5sash4_[0][1];
						}
					}
					if (value_ > 21) {
						while (value_ > 21 && aces_ > 0) {
							value_ -= 10;
							aces_--;
						}
						
					}
				}
				// need to morph ^ and below because seriously repeating
				else {
					for (var i = 0; i < casino.gameControl[1].current[2][0].length; i++) {
						var ha5sash4_ = casino.gameControl[1].current[2][0][i];
						if (ha5sash4_[0][1] == 11) {
							value_ += 11; aces_ += 1;
						} else {
							value_ += ha5sash4_[0][1];
						}
					}
					if (value_ > 21) {
						while (value_ > 21 && aces_ > 0) {
							value_ -= 10;
							aces_--;
						}
						
					}
				}
				if (value_ == 21 && casino.gameControl[1].current[3][casino.gameControl[1].handActive].length == 2) player.stats.casino.blackjack.blackjacks++; 
				return value_;
			},
			_loadDeck: function () {
				for (var i = 0; i < casino.gameControl[1].decks; i++) {
					for (var j = 0; j < 4; j++) {
						for (var k = 0; k < 13; k++) {
							casino.gameControl[1].current[0].push([casino.gameControl[1].cardnames[0][k],casino.gameControl[1].cardnames[1][j]]);
						}
					}
				}
				casino.gameControl[1]._cardCount();
			},
			_cardCount: function () {
				document.getElementById("blackjackCardCount").innerHTML = (100*(casino.gameControl[1].current[0].length)/(casino.gameControl[1].decks*52)).toFixed(2) + "%";
			}
		}
	]
}

function comenzar() {
	loadmusic("resources/loadingscreen.mp3");
	ele.start_title.style.top = "-300px";
	ele.startpageContent.style.top = "5000px";
	setTimeout(function () {ele.startpage.style.display = "none"; }, 1200);
	document.body.style.background = "#202020";
	ele.loadingscreen.style.display = "block";
	document.getElementById("culturebutton").style.left = (cord.x / 2 - 75) + "px";
	ele.loadingscreenContent.style.left = (window.innerWidth / 2 - 330) + "px";
	document.getElementById("casino").style.left = (cord.x / 2 - 390) + "px";
	document.getElementById("endscreen").style.left = (cord.x / 2 - 390) + "px";
	// if new player if new player if new player  if new player if new player if new player if new player if new player if new player if new player if new player
	player.name = ele.enteryourname.value;
	player.money = 200;
	player.currentday = "2017-05-03";
	player.gameday = "2017-07-17";
	// if not new player
	
	
	player.update();
	ele.panel.style.display = "block";
	
}



var _startTitle = {
	running: true,
	amt: 0
}

function startTitle(skip) {
	if (skip) { 
		ele.start_title.style.letterSpacing = ((cord.x / 30)*(Math.sin(Math.PI * 1/2))) + "px";
		ele.start_title.style.fontSize = ((cord.x / 30)*(Math.sin(Math.PI * 1/2))) + "px";
		ele.startpageContent.style.top = (cord.y / 2 - 110) + "px";
	}
	else {
		if (_startTitle.running) {
			ele.start_title.style.letterSpacing = ((cord.x / 30)*(Math.sin(Math.PI * _startTitle.amt / 360))) + "px";
			ele.start_title.style.fontSize = ((cord.x / 30)*(Math.sin(Math.PI * _startTitle.amt / 360))) + "px";
			_startTitle.amt += (_startTitle.amt < 90) ? 3 : 1;
			if (_startTitle.amt > 180) _startTitle.running = false;
			setTimeout(function () {startTitle()}, 10);
		} else {
			ele.start_title.style.transition = "all 0.4s ease-in-out";
			ele.startpageContent.style.top = (cord.y / 2 - 110) + "px";
		}
	}
}



function init() {
	// start page
	startTitle(false);
	//comenzar();
	//stage1();
	//player.money = 5000000;
	//player.stage = 4;
	//player.update();
	//stage5();
}