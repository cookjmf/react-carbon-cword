// ---- variables ----

// Action
// export const ACTION_TITLE = '--Choose action--';
export const ACTION_CREATE = 'create';
export const ACTION_CREATE_EXAMPLE = 'createExample';
export const ACTION_UPDATE = 'update';
export const ACTION_PLAY = 'play';
export const ACTION_IMPORT = 'import';
export const ACTION_EXPORT = 'export';
export const ACTION_CLEAR = 'clear';
export const ACTION_DELETE = 'delete';

// Name
export const NAME_TITLE = '--Choose crossword--';
export const NAME_PLACEHOLDER = '--Enter name--';
export const NAME_MIN_LEN = 3;
export const NAME_MAX_LEN = 80;

// Size
export const SIZE_TITLE = '--Choose size--';
export const SIZES_ALLOWED = [ '7', '15', '20' ];

// Examples

// 7 by 7 small data
export const EXAMPLE_A7 = 'example_A7';
export const CWORD_A7 = {"name": EXAMPLE_A7, "maxAcross": 7, "maxDown": 7};
CWORD_A7.blanks = '1 4;2 2;3 4;4 1,3;5 6;6 5';       
CWORD_A7.horizClues = '1. Father. Single. 2. Finger. 3. Deity! Sprite. 4. Music. 5. Displays. 6. Iema? Ti. 7. Transon.';
CWORD_A7.vertClues = '1. Canine. Repose. 2. Alternate. 3. Performed. Oma. 4. Bird. 5. Smelly. 6. Nemu. Towards. 7. Teach.'; 

// 15 by 15
export const EXAMPLE_B15 = 'example_B15';
export const CWORD_B15 = {"name":EXAMPLE_B15,"maxAcross":15,"maxDown":15};
CWORD_B15.blanks = "2 5,10;3 8,12;4 5,7,11,13;5 6;6 8,10,13,14;7 7,15;8 2,7;9 4,6,13;10 10,12;11 3;12 5,7,9,10,15;"
    + "13 8,11,13;14 7,14;15 1,2;"
CWORD_B15.horizClues = 
      "1. Compagnon de route."
    + "2. Fait la tête de cochon. Cours séché. Dans les montagnes russes."
    + "3. État noir. Ne se plaque pas facilement. Pièce meublée."
    + "4. La route du fer. A toujours le mot pour rire. Bouts de chandelles."
    + "5. Coucher dans un tonneau. Mise en forme."
    + "6. Nous sont très chers. Note."
    + "7. Blanc dangereux. Collée au mur."
    + "8. Est anglo-saxon. Blanc dangereux quand il y a de l'abus."
    + "9. Chinois, Belge ou d'Islande. Coup de masse. N'arrive en tête qu'un jour par semaine."
    + "10. Exposé à l'office. Tour de guet."
    + "11. Ne comptait guère pour Mao. Que deviendrait-elle sans ses fils ?"
    + "12. Fauteur de guerre. Nantais révoqué."
    + "13. A des trous dans la tête. Possessif. Préposition."
    + "14. Futur vétéran. Morceau de Vivaldi."
    + "15. Bonjour les dégâts."
CWORD_B15.vertClues = 
      "1. Très brillant dès le cours élémentaire."
    + "2. Bonne occasion. Jaune plus ou moins."
    + "3. Mirent en boule. A ce qu'il faut pour bien tourner."
    + "4. À l'envers : de Rome ou d'Aragon. Passe l'éponge."
    + "5. Éprouve. Dégazage."
    + "6. Monte ou descend, selon le sens. Tue n'importe comment. Espèce de perche."
    + "7. Bob rouge. Ancien. Double mixte."
    + "8. Presqu'île. Pige. Inséparable de Renaud, surtout au théâtre. Note."
    + "9. Reconnaîtra sans peine. Grande ombre chinoise."
    + "10. Indique le passage. Allumé ou éteint. Pris dans un grand bol."
    + "11. Pronom. Bruant ou Briand. Possessif."
    + "12. Conjonction. Centenaire. Simple villageois."
    + "13. Est vachement nourrissant. Éclat de rire. Grecque. Conjonction."
    + "14. Cognée. Toujours devant."
    + "15. Tournée. Lit des bouquins. Souvent décourageant."

// 20 by 20 full size
export const EXAMPLE_C20 = 'example_C20';
export const CWORD_C20 = {"name": EXAMPLE_C20, "maxAcross": 20, "maxDown": 20};
CWORD_C20.blanks = "1 8,20;2 6,13;3 5,13;4 14,19;5 9,15;6 5,11,15,18,20;7 2,4,9,12;8 6,8,14;9 1,7,10,13,17,19;10 2,4,10,16;"
     + "11 7,19;12 4,9,10,15,19;13 3,13,15,19;14 5,20;15 7,16,17,18;16 8,11,12,19;17 5,12,19;18 1,8,10,17;19 3,4,6,7,14,19;20 8,12;";
CWORD_C20.horizClues = 
      "1. On la croit ici mais elle est ailleurs. Occupent des postes de direction dans des compagnies aériennes. "
    + "2. Place à l'envers. Vieux poulets. Tremblait d'émotion. "
    + "3. Pompe papale. Partie en fugue. A pris le voile. "
    + "4. Des champignons parfois dangereux. Mesure obsolète. "
    + "5. Dans les montagnes russes. De vieux amis toujours fidèles. Collier de mariage. "
    + "6. Direction générale. Ne négligea aucune lettre. Créée. Passage en chinois. "
    + "7. Accents aigus. Bout de camembert. Terre très riche. "
    + "8. Père de mamelles. Jeu de cartes. Coucou ou zizi. "
    + "9. Fausse note. Préposition. Pronom. Se prend dans un grand bol à la campagne. "
    + "10. La fin de tout. N'est pas entravé à Oxford. A un côté théâtral. "
    + "11. Travaillent pour la voirie en Amérique. Productrice de bouchons. "
    + "12. Possédée. Nourrissait les gens d'armes. Retournée au Pérou. Est sans effets. "
    + "13. Conjonction. Les vols y sont assez fréquents. Lettres de Nosferatu. "
    + "14. Solidement bâti. Guère civile. "
    + "15. Mouche moche. Travaille  avec ses fils dans la marine. Possessif. "
    + "16. On y fait des pâtés. Un minimum d'adresse. Carré vert. "
    + "17. Esprit léger. À l'envers part personnelle. Familier de Labiche et de Ionesco. "
    + "18. Élément de train. Homme de troupe. Première mondiale. "
    + "19. Change presque tous les jours. Ruban à la page. Vieil auteur-compositeur-interprète. "
    + "20. Agglomérations ouvrières. Décoration murale. Étaient bienheureux aux enfers.";

CWORD_C20.vertClues = 
      "1. Réunion sans intérêt. Fait croquer le marmot. Pronom. "
    + "2. Rote. Petit morceau de sucre. Petites voies d'eau. "
    + "3. Spécialiste du chauffage central et des bouches de chaleur. Les damnés de la terre. "
    + "4. Grecs à part. La moitié d'une alouette. Un enfer très peuplé. "
    + "5. Es qualités. Morceau de reblochon. Avec lui, les départs sont foudroyants. L'agrément de l'Italie. Nom de lieu. "
    + "6. Patron en 40. Déviation pour poids lourds. "
    + "7. On lui a cassé les pieds ? Dégazage par derrière. Faisait partie de la Guépéou. "
    + "8. Portées par des vieux bien culottés. Un morceau de canard pris dans des filets. "
    + "9. Pas d'accord avec Poutine. Est toujours dans l'opposition. Faisait écho. "
    + "10. Humain mais pas naturel. De bas en haut : messager sur les ondes. Dans la gamme. "
    + "11. Bien sapée. Est allée chez les Arlésiens. File dans l'autre sens. "
    + "12. Col montant. Ont été mises au courant. Quartier de province. "
    + "13. Arrivées d'eau (salée). Surnuméraire chez les Quarante. Elle adorait les histoires de Marius. "
    + "14. Petit grain pour la foi. À l'envers : dura pour les Latins. Chez Aristote, n'est logique qu'en partie. "
    + "15. Fit avancer. Mesure à la main. Ce n'est pas le Pérou ! "
    + "16. A son utilité dans une exécution som-maire. Dans la nature. Ont changé d'air. "
    + "17. Centres d'émissions. Ne doit pas manquer de points ! Va de ville en ville. Particule. "
    + "18. Annoncer son départ. Oiseaux mécaniques. Que du blanc pour Arthur. "
    + "19. Terre de pots rouges. Petit cheval de manège. Ajoute quelque chose. "
    + "20. Distributrice d'images. Boîte à couture. Tables de la foi.";

export const EXAMPLE_MAP = new Map();
EXAMPLE_MAP.set(EXAMPLE_A7, CWORD_A7);
EXAMPLE_MAP.set(EXAMPLE_B15, CWORD_B15);
EXAMPLE_MAP.set(EXAMPLE_C20, CWORD_C20);
             
export const EXAMPLE_CLUES =
      "1. Conseillères de direction. Attaché militaire. \n"
    + "2. Souvent noires avec deux verres seulement. Faire au moins un bienheureux. \n"
    + "3. Débute dans un opéra de Verdi. Se dirige vers la morgue. Grand producteur. \n"
    + "4. Fille du Van ? A été chef de Colonne. \n"
    + "5. Mis sur la paille. Tempête sur le Nil. Solide casse-croûte. Retourné à la banque. \n"

// Allowed values for across/down
export const ACROSS_VALUES = [7, 15, 20];
export const DOWN_VALUES = [7, 15, 20];

export const OCR_ONLINE_URL = 'https://www.onlineocr.net';

export const HEADER_7 = ''+
    '           1   2   3   4   5   6   7\n'+
    '        ----------------------------\n';

export const HEADER_15 = ''+
    '                                               1                    \n'+
    '           1   2   3   4   5   6   7   8   9   0   1   2   3   4   5\n'+
    '        ------------------------------------------------------------\n';

export const HEADER_20 = ''+
    '                                               1                                       2\n'+
    '           1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0\n'+
    '        --------------------------------------------------------------------------------\n';

export const HEADER_MAP = new Map();
HEADER_MAP.set(7, HEADER_7);
HEADER_MAP.set(15, HEADER_15);
HEADER_MAP.set(20, HEADER_20);

export const COLOR_ORANGE = '#FFE1A4';
export const COLOR_YELLOW = 'yellow';
export const COLOR_NONE = 'transparent';

export const CONFIRM_VALIDATE = 'cw-confirm-validate';
export const CONFIRM_IMPORT = 'cw-confirm-import';

export const ERROR_INVALID_IMPORT_JSON = 'cw-error-invalid-import-json';

export const TA_ACROSS_CLUES = 'ta-clues-across';
export const TA_DOWN_CLUES = 'ta-clues-down';
export const TA_IMPORT = 'ta-import';

// ---- functions ----

export const toCellId = (y, x) => {
  return ''+toChar(y)+toChar(x);
}

export const toChar = (inta) => {
  let a2 = 96+inta;
  let c2 = String.fromCharCode(a2);
  return c2;
}

export const cellKeyFromCellId = (id) => {
  let c1 = id.substring(0,1);
  let y = fromChar(c1);
  let c2 = id.substring(1,2);
  let x = fromChar(c2);
  return cellKey(y,x);
}

export const fromChar = (ca) => {
  let a2 = ca.charCodeAt(0); // gets ascii code
  let n2 = a2-96;
  return n2;
}

export const removeNewLines = (lines) => {
  if (lines == null) {
    return lines;
  }
  // input is array
  lines = lines.replaceAll('\n', ' ');
  return lines;
}

export const formatClueLines = (lines) => {
  var ret = '';
  for (var i=0; i<lines.length; i++) {
    var line = lines[i];  
    line = line.replaceAll('\n', ' ');
    ret = ret + line + '\n';
  }
  return ret;
}

export const addIfNotIncludes = (x, y) => {
  if (x == null) {
    x = [];
  }
  if (!x.includes(y)) {
    x.push(y);
  }
  return x;
}

export const isValidName = (name) => {
  if (name == null || 
    name.length < NAME_MIN_LEN || 
    name.length > NAME_MAX_LEN || 
    name.startsWith('--')) {
    return false;
  }
  // if (name !== null && name.startsWith("example_")) {
  //   return false;
  // }
  return true;
}

export const isDuplicateName = (names, name) => {
  if (names.indexOf(name) >= 0) {
    return true;
  }
  return false;
}

export const isAllowedAcross = (val) => {
  if (ACROSS_VALUES.includes(val)) {
    return true;
  }
  return false;
}

export const isAllowedDown = (val) => {
  if (DOWN_VALUES.includes(val)) {
    return true;
  }
  return false;
}

export const isExample = (name) => {
  if (EXAMPLE_MAP.has(name)) {
    return true;
  }
  return false;
}

export const convertCluesRomanDash = (text) => {
  // handle style seen in 15by15 grids:
  // I. aaa. - II. ccc. (across)
  let cmap = new Map();
  cmap.set('I. ', '1. ');
  cmap.set('- II. ', '2. ');
  cmap.set('- III. ', '3. ');
  cmap.set('- IV. ', '4. ');
  cmap.set('- V. ', '5. ');
  cmap.set('- VI. ', '6. ');
  cmap.set('- VII. ', '7. ');
  cmap.set('- VIII. ', '8. ');
  cmap.set('- IX. ', '9. ');
  cmap.set('- X. ', '10. ');
  cmap.set('- XI. ', '11. ');
  cmap.set('- XII. ', '12. ');
  cmap.set('- XIII. ', '13. ');
  cmap.set('- XIV. ', '14. ');
  cmap.set('- XV. ', '15. ');
  cmap.set('- XVI. ', '16. ');
  cmap.set('- XVII. ', '17. ');
  cmap.set('- XVIII. ', '18. ');
  cmap.set('- XIX. ', '19. ');
  cmap.set('- XX. ', '20. ');
  for (const [key, value] of cmap.entries()) {
    text = text.replace(key, value);
  }
  return text;
}

export const convertCluesDash = (text) => {
  // handle styles seen in 15by15 grids:
  // 1. aaa. - 2. bbb.  (down)
  let cmap = new Map();
  // cmap.set('1. ', '1. ');  // not needed
  cmap.set('- 2. ', '2. ');
  cmap.set('- 3. ', '3. ');
  cmap.set('- 4. ', '4. ');
  cmap.set('- 5. ', '5. ');
  cmap.set('- 6. ', '6. ');
  cmap.set('- 7. ', '7. ');
  cmap.set('- 8. ', '8. ');
  cmap.set('- 9. ', '9. ');
  cmap.set('- 10. ', '10. ');
  cmap.set('- 11. ', '11. ');
  cmap.set('- 12. ', '12. ');
  cmap.set('- 13. ', '13. ');
  cmap.set('- 14. ', '14. ');
  cmap.set('- 15. ', '15. ');
  cmap.set('- 16. ', '16. ');
  cmap.set('- 17. ', '17. ');
  cmap.set('- 18. ', '18. ');
  cmap.set('- 19. ', '19. ');
  cmap.set('- 20. ', '20. ');
  for (const [key, value] of cmap.entries()) {
    text = text.replace(key, value);
  }
  return text;
}

export const date1 = () => {
  let date = new Date();
  let s = date.getSeconds();
  let m = date.getMinutes();
  let h = date.getHours();
  return format2(h)+':'+format2(m)+':'+format2(s);
}

export const format2 = (n) => {
  if (n <= 9) {
    return '0' + n;
  }
  return '' + n;
}

export const maxAcross = (size) => {
  // can be replaced for more complex values
  return 1 * size;
}

export const maxDown = (size) => {
  // can be replaced for more complex values
  return 1 * size;
}

export const numberedMaxAcross = (size) => {
  // can be replaced for more complex values
  return (1 * size) + 2;
}

export const numberedMaxDown = (size) => {
  // can be replaced for more complex values
  return (1 * size) + 2;
}

export const size = (maxAcross, maxDown) => {
  // can be replaced for more complex values
  return '' + maxAcross;
}

export const cellKey = (y,x) => {
  return y +'.'+x;
}

export const row = (cellKey) => {
  // cellKey = y.x
  let parts = cellKey.split('.');
  return 1 * parts[0];
}

export const column = (cellKey) => {
  // cellKey = y.x
  let parts = cellKey.split('.');
  return 1 * parts[1];
}

export const clueKey = (y, x, direction) => {
  return y +'.'+x+'.'+direction;
}
    
export const direction = (isAcross) => {
  let d = 'd';
  if (isAcross) {
    d = 'a';
  }
  return d;
}

export const mapToObject = (map1) => {
  const obj = Object.fromEntries(map1);
  return obj;
}

export const objectToMap = (obj1) => {
  const map = new Map(Object.entries(obj1));
  return map;
}

export const newDate = () => {
  return new Date().toISOString();
}

export const header = (maxAcross) => {
  let hdr = HEADER_MAP.get(maxAcross);
  return hdr;
}

export const formatNum = (n) => {
  if (n < 10) {
    return '  '+n;
  } else if (n < 100) {
    return ' '+n;
  } else {
    return n;
  }
}

export const shorten = (s, n) => {
  if (s == null) {
    return null;
  }
  let len = s.length;
  if (len > n) {
    let diff = len - n ;
    s = s.substring(0, n)+' ... ('+diff+' more)';
  }
  return s;
}

export const showErr = (err) => {
  console.log('err as json : ...'+JSON.stringify(err)+'...');
  console.log('err as string : ...'+err+'...');
  if (err != null) {
    console.log('err as err : ...'+err.message+'...'+err.stack+'...');
  }
}

export const printGridDebug = () => {
  // debugging flag to print the grid
  return false;
}

export const uniqLocation = (y,x,isAcross) => {
  return y+'.'+x+'.'+direction(isAcross);
}

export const apiUrl = () => {
  // let val = "http://localhost:8080";

  // --> using the above gives this error:

  // Access to fetch at 'http://localhost:8080/cwords' from origin 'http://localhost:3000' 
  // has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present 
  // on the requested resource. If an opaque response serves your needs, 
  // set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  let val = "";

  // --> using an empty value depends on this setting in package.json when in dev mode

  // "proxy": "http://localhost:8080"

  // let customVal = process.env.REACT_CWORD_API_URL;
  // if (customVal != null && customVal.length > 0) {
  //   val = ''+customVal;
  // }

  // for prod build:
  //    set PUBLIC_URL in build 
  //         this sets up index,html eg "<link rel="icon" href="http://localhost:8080/favicon.ico">"
  //    cp build dir to app dir
  //    add to server.js : "app.use('/', express.static(__dirname+'/app/build'))"

  return val;
}
