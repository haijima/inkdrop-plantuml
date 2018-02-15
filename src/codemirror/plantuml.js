'use babel'

export default {

  // prefix ID for regular expressions used in the grammar
  'RegExpID': 'RE::',

  // Style model
  'Style': {
    // editor_specific_style_tag master
    // "atom"
    // "attribute"
    // "builtin"
    // "comment"
    // "def"
    // "error"
    // "keyword"
    // "meta"
    // "number"
    // "operator"
    // "property"
    // "qualifier"
    // "string"
    // "string-2"
    // "tag"
    // "variable"
    // "variable-2"
    // "variable-3"
    'comment': 'comment',
    'atom': 'atom',
    'keyword': 'keyword',
    'this': 'keyword',
    'builtin': 'builtin',
    'operator': 'operator',
    'identifier': 'variable',
    'property': 'attribute',
    'number': 'number',
    'string': 'string',
    'regex': 'string-2'

  },

  // Lexical model
  'Lex': {
    'comment': {
      'type': 'comment',
      'tokens': [
        [ '\'', null ],
        [ '/\'', '\'/' ]
      ]
    },
    'identifier': 'RE::/[_A-Za-z$][_A-Za-z0-9$]*/',
    'this': 'RE::/this\\b/',
    'property': 'RE::/[_A-Za-z$][_A-Za-z0-9$]*/',
    'number': [
      'RE::/\\d+\\.\\d*/',
      'RE::/\\.\\d+/',
      'RE::/0(?![\\dx])/'
    ],
    'string': {
      'type': 'escaped-block',
      'escape': '\\',
      // start, end of string (can be the matched regex group ie. 1 )
      'tokens': [ "RE::/(['\"])/", 1 ]
    },
    'regex': {
      'type': 'escaped-block',
      'escape': '\\',
      // javascript literal regular expressions can be parsed similar to strings
      'tokens': [ '/', 'RE::#/[gimy]{0,4}#' ]
    },
    'operator': {
      'tokens': [
        'RE::/-(u|d|r|l|up|down|right|left)?-(\\|>|\\*|o|>|#|x|{|\\+|\\^})?/', 'RE::/(<\\||\\*|o|<|#|x|}|\\+|\\^})?-(u|d|r|l|up|down|right|left)?-/',
        'RE::/\\.(u|d|r|l|up|down|right|left)?\\.(\\|>|>)?/', 'RE::/(<\\||<)?\\.(u|d|r|l|up|down|right|left)?\\./',
        'RE::/\\*-(u|d|r|l|up|down|right|left)?->/', 'RE::/<-(u|d|r|l|up|down|right|left)?-\\*/',
        'RE::/-(\\|>|\\*|o|>|#|x|{|\\+|\\^})?/', 'RE::/(<\\||\\*|o|<|#|x|}|\\+|\\^})?-/',
        'RE::/\\.(\\|>|>)?/', 'RE::/(<\\||<)?\\./',
        'RE::/\\*->/', 'RE::/<-\\*/',
        '=>', '<='
      ]},
    'delimiter': {
      'tokens': [
        '(', ')', '[', ']', '{', '}', ',', '=', ';', '?', ':',
        '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '++', '--',
        '>>=', '<<='
      ]},
    'atom': {
      'autocomplete': true,
      'tokens': [
        'true', 'false',
        'null', 'undefined',
        'NaN', 'Infinity'
      ]},
    'keyword': {
      'autocomplete': true,
      'tokens': [
        '@startuml', '@enduml',
        'if', 'while', 'with', 'else', 'do', 'try', 'finally',
        'return', 'break', 'continue', 'new', 'delete', 'throw',
        'var', 'const', 'let', 'function', 'catch', 'void',
        'for', 'switch', 'case', 'default', 'class', 'import', 'yield',
        'in', 'typeof', 'instanceof'
      ]},
    'builtin': {
      'autocomplete': true,
      'tokens': [
        'abstract', 'actor', 'class', 'component', 'enum', 'interface', 'object', 'package', 'participant', 'state', 'usecase'
      ]}
  },

  // Syntax model (optional)
  'Syntax': {
    'dot_property': {'sequence': ['.', 'property']},
    'puml': "comment | number | string | regex | keyword | operator | atom | (('}' | ')' | this | builtin | identifier | dot_property) dot_property*)"
  },

  // what to parse and in what order
  'Parser': [ ['puml'] ]
}
