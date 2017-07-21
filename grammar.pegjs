Script
  = stats:( _ stat:Statement _ "\n" { return stat; } )* { 
      return {node:"Script", statements:stats.filter(s => s)}; 
    }
  
Statement
 = "let" _ ident:Identifier _ "=" _ expr:Expression { 
      return { node: "Statement:Let", identifier: ident, value: expr }; 
    }
 / "proc" _ procname:Identifier "(" _  params:ParamDeclList _ ")" _ "\n" body:Script "end" {
 		return {
        	node: "ProcDecl",
            name: procname,
            params: params,
            body: body.statements
        };
 	}
 / "repeat" _ count:(Number/Identifier) _ "\n" body:Script? _ "end" { 
      return { node: "Statement:Repeat", count: count, body: body.statements }; 
    }
 / "call" _ funcc:FuncCall { return funcc; }
 / ("color"/"col") _ val:String {
      return { node: "Statement:Color", value: val };
   } 
 / comm:Command _ params:ExprList { 
      return { node: "Statement:Command", command: comm, params: params }; 
   }
 / ident:Identifier _ "=" _ expr:Expression { 
      return { node: "Statement:Assign", variable: ident, value: expr }; 
   }
 / _ &"\n" { return null; }
 / &"end" { return null; }
 / [^\n]+ { return {node:"Error"}; }
 
Command
 = ( "pushpos"i
 / "poppos"i
 / "fd"i / "forward"i
 / "bk"i / "backward"i
 / "lt"i / "left"i
 / "rt"i / "right"i
 / "show"i
 / "hide"i
 / "penup"i / "pu"i 
 / "pendown"i / "pd"i
 / "home"i 
 / "thick"i / "thickness"i
 / "screen"i) { return text(); }
 
ParamDeclList
 = (head:Identifier tail:(_ Identifier)* { return [head].concat(tail); })?
  
Identifier
  = [a-zA-Z_][a-zA-Z_0-9]* { return "@" + text(); }

Expression
  = head:Term tail:( _ op:("+" / "-") _ term:Term { return {op:op, term:term}; } )* {
  		return tail.length == 0 ? head : {
        	"node": "Expression",
            "terms": [head].concat(tail.map(x=>x.term)),
            "ops": tail.map(x=>x.op),
        };
    }
  
Term
  = head:Factor tail:( _ op:("*" / "/") _ factor:Factor { return {op:op, factor: factor}} )* {
  		return tail.length == 0 ? head : {
        	"node": "Term",
            "factors": [head].concat(tail.map(x=>x.factor)),
            "ops": tail.map(x=>x.op)
        };
    }

Factor
  = Number
  / FuncCall
  / Identifier 
  / "(" _ expr:Expression _ ")" { return expr; }
  
FuncCall
  = func:Identifier "(" _ params:ExprList _ ")" { 
      return { node: "Expression:Call", func: func, params: params }; 
    }
  
ExprList
  = head:Expression tail:( _ Expression )* { return [head].concat(tail.map(x=>x[1])); }
  / _ { return []; }
  
Number 
  = [0-9]+ ( "." [0-9]+ )? 	{ return parseFloat(text()); }

String
  = "\"" val:[^"]* "\"" { return val.join(""); }
  / "\'" val:[^']* "\'" { return val.join(""); }

_ "whitespace"
  = ws* { return null; }

ws = [ \t\r]/("#"[^\n]*) { return null; }  