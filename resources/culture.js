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
	stage: 0
};

var cityname = [
	"Maracaibo",
	"Barquisimeto",
	"Caracas",
	"Barcelona",
	"Maturín"
];

var city = [
	[[],[],[],{},
		[
			"Maracaibo",
			"<div class=\"stageHeader1\">La Tierra del Sol Amada</div><img id=\"stageImage1\" src=\"resources/stage-maracaibo1.jpg\" width=\"100%\" /><p>Qué vista a ver. Está es La Tierra del Sol Amada, también conocido como Maracaibo, una ciudad en Venezuela. Maracaibo es la capital del estadio de Zulia, la segunda ciudad más grande en Venezuela, con dos millones seiscientos mil personas. Los residentes en Maracaibo prefieren llamarse los marabinos, los maracaiberos, o los maracuchos. La ciudad se fundó en el siglo XVI.</p><p>Maracaibo no siempre fue la gran ciudad es hoy. Para cientos de años la ciudad estaba aislado y separado del país porque de su lago. Pero en 1958, un proyecto de gran dimensiones empezó. Venezuela iba a hacer un puente que cruzaría el lago de más cinco millas. Hacía cuarenta meses que tomaba construir, y el conectó Maracaibo con el país. El puente se llamó «El Puente De General Rafael Urdaneta», llamado por un héroe de Venezuela en el guerra de independencia de Venezuela.</p><p>Hoy, la ciudad es una targeta de los ciudadanos de Venezuela para refugio porque de razones politicos, culturales, y más importantamente, económicos en el resto del país. Mientras Maracaibo tiene sus propios problemas, es mejor en Maracaibo que en muchos otras ciudades en Venezuela. Maracaibo también tiene la mejor universidad de Venezuela, La Universidad de Zulia.</p><div class=\"stageHeader1\">Seguiridad en la Ciudad</div><p>Hay algunos cosas que ser consciente de si decides viajar a Maracaibo. El CDC de los Estados Unidos recomenda tener la vacuna de el typhoid y tener cuidado de la posibilidad de malaria. La ciudad también tiene muchas delincuencias y recomenda estar en grupos de personas leales y no utilizar ATMs con ningunas luces. Hay también muchos secuestros entonces no estar solo. No estar solo.</p>"
		]
	],
	[[],[],[],{},
		[
			"Barquisimeto",
			"<div class=\"stageHeader1\">Nueva Segovia de Barquisimeto</div><img id=\"stageImage1\" src=\"resources/stage-barquisimeto1.jpg\" width=\"100%\" /><p>Barquisimeto se fundó en 1552 como la sede para la area que Venezuela pensó tener muchos oros. La ciudad se llamaba Variquicimeto por las gentes nativas en el region. Barquisimeto tiene más o menos un millón personas, es la capital del estadio de Lara, y es la cuarta ciudad más grande en Venezuela. Barquisimeto se dividen por la geografía.</p><p>Muchos del éxito de la ciudad es porque de su posición en el país. Barquisimeto se establece en el centro de las dos mitades de Venezuela, el este y oeste. Por esto, la ciudad consigue un parte grande del comercio y el viajo del país.</p><div class=\"stageHeader1\">Nueva Segovia de Barquisimeto</div><p>Desafortunadamente, como todos las otras ciudades en Venezuela, Barquisimeto tiene un mayor problema de crimen. Se recomienda que tú no viajas en la ciudad solo, especialmente en el noche. Algunos reportajes se dicen sin duda tú serás robado o peor. Pero la ciudad es bonita.</p>"
		]
	],
	[[],[],[],{},
		[
			"Caracas",
			"<div class=\"stageHeader1\">La Capital de Venezuela</div><img id=\"stageImage1\" src=\"resources/stage-caracas1.jpg\" width=\"100%\" /><p>Bonita. La ciudad de Caracas, o Santiago de León de Caracas, es la capital y la ciudad más grande de Venezuela con más de cuatro millones de personas vivir en la ciudad. La ciudad se fundó en el siglo XVI como Maracaibo. En el comienzo, el fundador de la ciudad tratía de crear asentamientos en el área, pero había un problema con los indígenas no les gustan nuevos personas en su territorio y eventualmente los indígenas buscaron destruir los asentamientos. Pero España no tenía ningún parte de los indígenas, y después del esfuerzo despiadado de España contra de los, los indígenas finalmente abandonaron.</p><p>Caracas hizo un papel crucial en el surgimiento de la independencia de Venezuela. En el cinco de julio de 1811, La Declaración de Independencia de Venezuela escribió en Caracas. El año próximo Caracas sufrió de un terremoto que destruyó toda la ciudad, y con ése y la pérdida de la batalla de la Victoria, Venezuela perdió su guerra con España. Pero Venezuela siguió luchando, y dos más guerras luchó antes de Venezuela obtuvo su independencia.</p><p>Como el país, la economía de Caracas apoyó por el mercado de petróleo y su abundancia en el siglo XX. Durante este tiempo, la ciudad aumentó tremendamente. Petróleo se hizo el parte más grande de Venezuela y la empresa Petróleo de Venezuela, situado en Caracas, es ahora la empresa más grande en Venezuela.</p><div class=\"stageHeader1\">Seguiridad en la Ciudad</div><p>Caracas tiene uno de tasas de asesinatos más altas en el mundo. Hay muchos crimenes en la ciudad, pero los reportajes se dicen que es más seguro caminar solo en la noche en Caracas que Barquisimeto.</p>"
		],
	],
	[[],[],[],{},
		[
			"Barcelona",
			"<div class=\"stageHeader1\">No el Uno en España</div><img id=\"stageImage1\" src=\"resources/stage-barcelona1.jpg\" width=\"100%\" /><p>Barcelona de Venezuela se fundó en el siglo XVII. La ciudad es la capital de Anzoátegui. La ciudad es cerca del oceáno. La ciudad no es muy apasionante, y porque de la Barcelona en España mi investigación es dificíl, pero yo sé la tiene algunas aruitecturas bonitas.</p><img class='stageImageShowcase' src=\"resources/stage-barcelona2.jpg\" width=\"100%\" /><div class='stageImageCaption'>Ermita del Carmen Church</div><img class='stageImageShowcase' src=\"resources/stage-barcelona3.jpg\" width=\"100%\" /><div class='stageImageCaption'>Basílica de San José</div><img class='stageImageShowcase' src=\"resources/stage-barcelona4.jpg\" width=\"100%\" /><div class='stageImageCaption'>Puente Pasarella para el Estadio de Simon Bolívar</div><img class='stageImageShowcase' src=\"resources/stage-barcelona5.jpg\" width=\"100%\" /><div class='stageImageCaption'>Casa Fuerte, donde un masacre de 1600 personas por el Español tuvo lugar.</div>"
		]
	],
	[[],[],[],{},
		[ // 4 (local stuff)
			"Maturín",
			"<div class=\"stageHeader1\">La Ciudad Distinta</div><img id=\"stageImage1\" src=\"resources/stage-maturin1.jpg\" width=\"100%\" /><p>Maturín, Venezuela es una ciudad bonita con más de cuatrocientas mil personas. Es la capital de Monagas y creyó ser «La Ciudad más limpia de Venezuela». La ciudad se fondó en el siglo XVIII pero hay controversia por quien actualmente fondarse la ciudad. Algunos creen que España lo hizo pero Venezuela atribue un misionero francés para el fundador de la ciudad. Pero hay aún más controversia con el nombre de la ciudad. Porque de la controversia de fondarse, quien Maturín fue en historia cambia de persona a persona. Algunos creen que fue un indígena que asesinó por un amigo de España, pero otros creen que Maturín es francés, y el nombre vino del mismo persona francés que creía ser el uno que se fondó la ciudad.</p><p>Maturín es la casa del Estadio Monumental de Maturín, el estadio más grande de todos de Venezuela. Colombia y Venezuela juega un partido de fútbol allí en el diez y siete de julio del 2017. "
		]
	],
];

// elements
var ele = {
	stage: document.getElementById("stage"),
	stageContent: document.getElementById("stageContent"),
	stageDate: document.getElementById("stageDate"),
}

// center screen elements
var cord={x:window.innerWidth,y:window.innerHeight}
window.onresize=function(){cord={x:window.innerWidth,y:window.innerHeight}}

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
		
	},
	_dayleft: function () {
		document.getElementById("dayleft").innerHTML = (player.dayleft * 100).toFixed(2);
	}
}

function stage1() {
	stage._load();
	stage._open();
}

function paperFlip() {
	if (ele.stageContent.style.transform == "rotate(1080deg)") ele.stageContent.style.transform = "rotate(0deg)";
	else ele.stageContent.style.transform = "rotate(1080deg)";
}

function init() {
	stage1();
}