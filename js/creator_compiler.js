/*
 *  Copyright 2018-2021 Felix Garcia Carballeira, Diego Camarmas Alonso, Alejandro Calderon Mateos
 *
 *  This file is part of CREATOR.
 *
 *  CREATOR is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  CREATOR is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with CREATOR.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


/********************
 * Global variables *
 ********************/

/*Architecture editor*/

/*Available architectures*/
var architecture_available = [];
/*New architectures*/
var load_architectures_available = [];
var load_architectures = [];
/*Architectures card background*/
var back_card = [];
/*Load architecture*/
var architecture = {components:[], instructions:[], directives:[], memory_layout:[]};
var architecture_hash = [];
/*Components form select*/
var componentsTypes = [
  { text: 'Integer', value: 'integer' },
  { text: 'Floating point', value: 'floating point' },
  { text: 'Control', value: 'control' },
];
/*Intructions form select*/
var instructionsTypes = [
  { text: 'Arithmetic integer', value: 'Arithmetic integer' },
  { text: 'Arithmetic floating point', value: 'Arithmetic floating point' },
  { text: 'Logic', value: 'Logic' },
  { text: 'Transfer between registers', value: 'Transfer between registers' },
  { text: 'Memory access', value: 'Memory access' },
  { text: 'Comparison', value: 'Comparison' },
  { text: 'I/O', value: 'I/O' },
  { text: 'Syscall', value: 'Syscall' },
  { text: 'Control', value: 'Control' },
  { text: 'Function call', value: 'Function call' },
  { text: 'Conditional bifurcation', value: 'Conditional bifurcation' },
  { text: 'Unconditional bifurcation', value: 'Unconditional bifurcation' },
  { text: 'Other', value: 'Other' },
];
/*Directives form select*/
var actionTypes = [
  { text: 'Data Segment', value: 'data_segment' },
  { text: 'Code Segment', value: 'code_segment' },
  { text: 'Global Symbol', value: 'global_symbol' },
  { text: 'Byte', value: 'byte' },
  { text: 'Half Word', value: 'half_word' },
  { text: 'Word', value: 'word' },
  { text: 'Double Word', value: 'double_word' },
  { text: 'Float', value: 'float' },
  { text: 'Double', value: 'double' },
  { text: 'Space', value: 'space' },
  { text: 'ASCII not finished in null', value: 'ascii_not_null_end' },
  { text: 'ASCII finished in null', value: 'ascii_null_end' },
  { text: 'Align', value: 'align' },
  { text: 'Balign', value: 'balign'},
];


/*Compilator*/

/*Codemirror*/
var textarea_assembly_editor;
var codemirrorHistory = null;
/*Assembly code textarea*/
var code_assembly = '';
/*Compilation index*/
var tokenIndex = 0 ;
var nEnters = 0 ;
var pc = 4; //PRUEBA
/*Instructions memory address*/
var address;
/*Data memory address*/
var data_address;
/*Stack memory address*/
var stack_address;
/*Backup memory address*/
var backup_stack_address;
var backup_data_address;
/*Pending instructions and pending tags*/
var pending_instructions = [];
var pending_tags = [];
/*Global functions*/
var extern = [];
/*Error code messages*/
var compileError = {
	 'm0': function(ret) { return ""                                   + ret.token + "" },
	 'm1': function(ret) { return "Repeated tag: "                     + ret.token + "" },
	 'm2': function(ret) { return "Instruction '"                      + ret.token + "' not found" },
	 'm3': function(ret) { return "Incorrect instruction syntax for '" + ret.token + "'" },
	 'm4': function(ret) { return "Register '"                         + ret.token + "' not found" },
	 'm5': function(ret) { return "Immediate number '"                 + ret.token + "' is too big" },
	 'm6': function(ret) { return "Immediate number '"                 + ret.token + "' is not valid" },
	 'm7': function(ret) { return "Tag '"                              + ret.token + "' is not valid" },
	 'm8': function(ret) { return "Address '"                          + ret.token + "' is too big" },
	 'm9': function(ret) { return "Address '"                          + ret.token + "' is not valid" },
    'm10': function(ret) { return ".space value out of range ("        + ret.token + " is greater than 50MiB)" },
      //'m11': function(ret) { return "This field '"                       + ret.token + "' must end with ')'" },
	'm12': function(ret) { return "This field is too small to encode in binary '" + ret.token + "" },
	'm13': function(ret) { return "Incorrect pseudoinstruction definition "    + ret.token + "" },
	'm14': function(ret) { return "Invalid directive: "                        + ret.token + "" },
	'm15': function(ret) { return "Invalid value '"                            + ret.token + "' as number." },
	'm16': function(ret) { return 'The string of characters must start with "' + ret.token + "" },
	'm17': function(ret) { return 'The string of characters must end with "'   + ret.token + "" },
	'm18': function(ret) { return "Number '"                                   + ret.token + "' is too big" },
	'm19': function(ret) { return "Number '"                                   + ret.token + "' is empty" },
      //'m20': function(ret) { return "The text segment should start with '"       + ret.token + "'" },
	'm21': function(ret) { return "The data must be aligned"                   + ret.token + "" },
	'm22': function(ret) { return "The number should be positive '"            + ret.token + "'" },
	'm23': function(ret) { return "Empty directive"                            + ret.token + "" },
	'm24': function(ret) { return "After the comma you should go a blank --> " + ret.token + "" },
	//'m25': function(ret) { return "Incorrect syntax "                          + ret.token + "" },
	'm26': function(ret) { return "Syntax error near line: "                   + ret.token + "" }
} ;
/*Promise*/
let promise;


/*Simulator*/

/*Displayed notifications*/
var notifications = [];
/*Available examples*/
var example_available = [];
/*Execution*/
var executionIndex = 0;
var runExecution = false;
var runProgram = false;
var iter1 = 1;
var executionInit = 1;
/*Keyboard*/
var consoleMutex = false;
var mutexRead = false;
var newExecution = true;
/*Instructions memory*/
var instructions = [];
var instructions_tag = [];
var tag_instructions = {};
var instructions_binary = [];
/*Data memory*/
var data = [];
var data_tag = [];
/*Binary*/
var code_binary = '';
var update_binary = '';
/*Stats*/
var totalStats = 0;
var stats_value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var stats = [
  { type: 'Arithmetic integer', number_instructions: 0, percentage: 0 },
  { type: 'Arithmetic floating point', number_instructions: 0, percentage: 0},
  { type: 'Logic', number_instructions: 0, percentage: 0, abbreviation: "Log" },
  { type: 'Transfer between registers', number_instructions: 0, percentage: 0},
  { type: 'Memory access', number_instructions: 0, percentage: 0},
  { type: 'Comparison', number_instructions: 0, percentage: 0},
  { type: 'I/O', number_instructions: 0, percentage: 0},
  { type: 'Syscall', number_instructions: 0, percentage: 0},
  { type: 'Control', number_instructions: 0, percentage: 0},
  { type: 'Function call', number_instructions: 0, percentage: 0},
  { type: 'Conditional bifurcation', number_instructions: 0, percentage: 0},
  { type: 'Unconditional bifurcation', number_instructions: 0, percentage: 0},
  { type: 'Other', number_instructions: 0, percentage: 0},
];
/*Keyboard*/
var keyboard = '' ;
/*Display*/
var display = '' ;


//
// Load architecture
//


// Load architecture

function load_arch_select ( cfg )
{
	    var ret = {
                        errorcode: "",
                        token: "",
                        type: "",
                        update: "",
                        status: "ok"
                      } ;

	    var auxArchitecture = cfg;
	    architecture = register_value_deserialize(auxArchitecture);

	    architecture_hash = [];
	    for (var i = 0; i < architecture.components.length; i++) {
	         architecture_hash.push({name: architecture.components[i].name, index: i});
	    }

	    backup_stack_address = architecture.memory_layout[4].value;
	    backup_data_address  = architecture.memory_layout[3].value;

	    ret.token = "The selected architecture has been loaded correctly";
	    ret.type  = "success";
	    return ret;
}


//
// Console.log
//

var creator_debug = false ;

function console_log ( msg )
{
	if (creator_debug) {
	    console.log(msg) ;
	}
}


//
// Compiler
//

/*Compile assembly code*/
function packCompileError(err_code, err_token, err_ti, err_bgcolor )
{
  var ret = {} ;

  ret.status     = "error" ;
  ret.errorcode  = err_code ;
  ret.token      = err_token ;
  ret.type       = err_ti ;
  ret.bgcolor    = err_bgcolor ;
  ret.tokenIndex = tokenIndex ;
  ret.line       = nEnters ;

  ret.msg = compileError[err_code](ret) ;

  /*Google Analytics*/
  creator_ga('compile', 'compile.error', 'compile.error.' + ret.msg);
  creator_ga('compile', 'compile.type_error', 'compile.type_error.' + err_code);

  return ret ;
}

/*Places the pointer in the first position*/
function first_token()
{
        var assembly = code_assembly ;
        var index    = tokenIndex;

        // check that there are elements to read
        if (index >= assembly.length) {
            return null;
        }

        // skip till first token:
        while ( (":\t\n \r#".includes(assembly.charAt(index))) && (index < assembly.length) )
        {
              // skip <spaces>
              while ( (":\t\n \r".includes(assembly.charAt(index))) && (index < assembly.length) ) {
                      if (assembly.charAt(index) == "\n") nEnters++ ;
                      index++;
              }

              // skip line comment #...
              if (assembly.charAt(index) == '#')
              {
                  while ((assembly.charAt(index) != '\n') && (index < assembly.length)) {
                          index++;
                  }

                  while ( (":\t\n \r".includes(assembly.charAt(index))) && (index < assembly.length) ) {
                          if (assembly.charAt(index) == "\n") nEnters++ ;
                          index++;
                  }
              }
        }

        tokenIndex = index;
}

/* Read token */
function get_token()
{
        var assembly = code_assembly ;
        var index    = tokenIndex;

        // check that there are elements to read
        if (index >= assembly.length) {
            return null;
        }

        // read string: '...'
        if (assembly.charAt(index) == "'") {
            index++;
            while (assembly.charAt(index) != "'" && index < assembly.length) {
                  //if (assembly.charAt(index) == "\n") nEnters++ ;
                  index++;
            }
            index++;

            return assembly.substring(tokenIndex, index);
        }

        // read string: "..."
        if (assembly.charAt(index) == '"') {
            index++;
            while (assembly.charAt(index) != '"' && index < assembly.length) {
                  //if (assembly.charAt(index) == "\n") nEnters++ ;
                  index++;
            }
            index++;

            return assembly.substring(tokenIndex, index);
        }

        // ([{...
        if ("([{".includes( assembly.charAt(index) )) {
             index++;
        }

        while ((",()[]{}:#\t\n \r".includes( assembly.charAt(index) ) == false) && (index < assembly.length))
        {
             index++;
        }
        //if (assembly.charAt(index) == "\n") nEnters++ ;

        var res = assembly.substring(tokenIndex, index) ;
        if (":)]}".includes( assembly.charAt(index) )) {
            res = res + assembly.charAt(index);
        }

        return res;
}


/*Places the pointer in the start of next token*/
function next_token()
{
        var assembly = code_assembly ;
        var index    = tokenIndex;

        // '..'
        if (assembly.charAt(index) == "'") {
            index++;
            while (assembly.charAt(index) != "'" && index < assembly.length) {
                  if (assembly.charAt(index) == "\n") nEnters++ ;
                  index++;
            }
            index++;
        }

        // ".."
        if (assembly.charAt(index) == '"') {
            index++;
            while (assembly.charAt(index) != '"' && index < assembly.length) {
                  if (assembly.charAt(index) == "\n") nEnters++ ;
                  index++;
            }
            index++;
        }

        // ([..
        if ("([{".includes( assembly.charAt(index) )) {
             index++;
        }

        while ((",()[]{}:#\t\n \r".includes( assembly.charAt(index) ) == false) && (index < assembly.length))
        {
             index++;
        }
        //if (assembly.charAt(index) == "\n") nEnters++ ;

        while ((",()[]{}:#\t\n \r".includes( assembly.charAt(index) )) && (index < assembly.length))
        {
          while (",)]}:\t\n \r".includes( assembly.charAt(index) ) && (index < assembly.length))
          {
             if (assembly.charAt(index) == "\n") nEnters++ ;
             index++;
          }

          if ("([{".includes( assembly.charAt(index) )) {
               break;
          }

          if (assembly.charAt(index) == '#')
          {
              while ((assembly.charAt(index) != '\n') && (index < assembly.length)) {
                    index++;
              }

              while (("()[]{}:\t\n \r".includes( assembly.charAt(index) )) && (index < assembly.length))
              {
                 if (assembly.charAt(index) == "\n") nEnters++ ;
                 index++;
              }
          }
        }

        tokenIndex = index;
}


/*Compile assembly code*/
function assembly_compiler()
{
	var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;

        /* Google Analytics */
        creator_ga('compile', 'compile.assembly');
      	
        instructions = [];
        instructions_tag = [];
        tag_instructions = {};
        pending_instructions = [];
        pending_tags = [];
        data_tag = [];
        instructions_binary =[];
        crex_memory_clear() ;
        extern = [];
        data = [];
        executionInit = 1;
        mutexRead = false;

        pc = 4;

        nEnters = 0;

        if(update_binary.instructions_binary != null){
          for(var i = 0; i < update_binary.instructions_binary.length; i++){
            instructions.push(update_binary.instructions_binary[i]);
            if(i == 0){
              instructions[instructions.length-1].hide = false;
              if(update_binary.instructions_binary[i].globl == false){
                instructions[instructions.length-1].Label = "";
              }
            }
            else if(update_binary.instructions_binary[i].globl == false){
              instructions[instructions.length-1].Label = "";
              instructions[instructions.length-1].hide = true;
            }
            else if(update_binary.instructions_binary[i].globl == null){
              instructions[instructions.length-1].hide = true;
            }
            else{
              instructions[instructions.length-1].hide = false;
            }

            address = parseInt(instructions[instructions.length-1].Address, 16) + 4;
          }
        }
        else{
          address = parseInt(architecture.memory_layout[0].value);
        }

        var numBinaries = instructions.length;


        /*Allocation of memory addresses*/
        architecture.memory_layout[4].value = backup_stack_address;
        architecture.memory_layout[3].value = backup_data_address;
        data_address = parseInt(architecture.memory_layout[2].value);
        stack_address = parseInt(architecture.memory_layout[4].value);

        architecture.components[1].elements[29].value = bi_intToBigInt(stack_address,10) ;
        architecture.components[0].elements[0].value  = bi_intToBigInt(address,10) ;
        architecture.components[1].elements[29].default_value = bi_intToBigInt(stack_address,10) ;
        architecture.components[0].elements[0].default_value  = bi_intToBigInt(address,10) ;

        /*Reset stats*/
        totalStats = 0;
        for (var i = 0; i < stats.length; i++){
          stats[i].percentage = 0;
          stats[i].number_instructions = 0;
          stats_value[i] = 0;
        }

        align = 0;
        var empty = false;

        /*Start of compilation*/
        first_token();
        if (get_token() == null) {
            hide_loading();
            return packCompileError('m0', 'Please enter the assembly code before compiling', 'warning', 'danger') ;
        }

        token = get_token();
        console_log(token)

        while(!empty)
        {
          token = get_token();
          console_log(token)

          if(token == null){
            empty = true;
            break;
          }

          var change = false;

          for (var i = 0; i < architecture.directives.length; i++)
          {
            if (token == architecture.directives[i].name)
            {
              switch(architecture.directives[i].action)
              {
                case "data_segment":
                  console_log("data_segment");
                  ret = data_segment_compiler();
                  if (ret.status == "ok") {
                      change = true;
                  }
                  if (ret.status != "ok")
                  {
                    instructions = [];
                    pending_instructions = [];
                    pending_tags = [];
                    data_tag = [];
                    instructions_binary = [];
                    data = [];
                    extern = [];
                    crex_memory_clear() ;

                    return ret;
                  }
                  break;

                case "code_segment":
                  console_log("code_segment") ;
                  ret = code_segment_compiler();
                  if (ret.status == "ok") {
                      change = true;
                  }
                  if (ret.status != "ok")
                  {
                    instructions = [];
                    pending_instructions = [];
                    pending_tags = [];
                    data_tag = [];
                    instructions_binary = [];
                    extern = [];
                    data = [];
                    crex_memory_clear() ;

                    return ret;
                  }
                  break;

                case "global_symbol":
                  var isGlobl = true;
                  next_token();

                  while(isGlobl){
                    token = get_token();

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");
                    console_log("token: " + token)

                    extern.push(token);
                    change = true;

                    next_token();
                    token = get_token();
                    console_log("token: " + token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                        isGlobl = false;
                      }
                    }
                  }
                  break;

                default:
                  console_log("default") ;
                  empty = true;
                  break;
              }
            }

            else if (i== architecture.directives.length-1 && token != architecture.directives[i].name && change == false && token != null)
            {
              empty = true;
              //tokenIndex = 0;
              //nEnters = 0 ;
              return packCompileError('m14', token, 'error', "danger");
            }
          }
        }

        var found = false;

        if(update_binary.instructions_binary != null){
          for(var j = 0; j<instructions.length; j++){
            if(instructions[j].Label != ""){
              for(var i = 0; i<update_binary.instructions_tag.length; i++){
                if(instructions[j].Label == update_binary.instructions_tag[i].tag){
                  update_binary.instructions_tag[i].addr = instructions[j].Address;
                }
              }
            }
          }
        }

        /*Check pending instructions*/
        for (var i = 0; i < pending_instructions.length; i++)
	{
          var exit = 0;
          var signatureParts    = pending_instructions[i].signature;
          var signatureRawParts = pending_instructions[i].signatureRaw;
          var instructionParts  = (pending_instructions[i].instruction).split(' ');
          console_log(instructionParts);

          for (var j = 0; j < signatureParts.length && exit == 0; j++)
	  {
            if (signatureParts[j] == "inm-signed" || signatureParts[j] == "inm-unsigned" || signatureParts[j] == "address")
            {

              for (var z = 0; z < instructions.length && exit == 0; z++)
	      {
                if (instructions[z].Label == instructionParts[j])
		{
                  var addr = instructions[z].Address;
                  var bin  = parseInt(addr, 16).toString(2);
                  var startbit = pending_instructions[i].startBit;
                  var stopbit  = pending_instructions[i].stopBit;

                  instructionParts[j] = addr;
                  var newInstruction  = "";
                  for (var w=0; w < instructionParts.length; w++)
	          {
                      newInstruction = newInstruction + instructionParts[w];
                      if (w != instructionParts.length-1) {
                          newInstruction = newInstruction + " ";
                      }
                  }

                  for (var w=0; w < instructions.length && exit == 0; w++)
		  {
                       var aux = "0x" + (pending_instructions[i].address).toString(16);
                       if (aux == instructions[w].Address) {
                           instructions[w].loaded = newInstruction;
                       }
                  }

                  for (var w=0; w < instructions.length && exit == 0; w++)
	          {
                       var aux = "0x" + (pending_instructions[i].address).toString(16);
                       if (aux == instructions[w].Address)
		       {
                           instructions[w].loaded = newInstruction;
                           var fieldsLength = startbit - stopbit + 1;
                           console_log(w)
                           console_log(numBinaries)
                           console_log(w - numBinaries)
	                   var iload =  instructions_binary[w - numBinaries].loaded;
                           instructions_binary[w - numBinaries].loaded = iload.substring(0, iload.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + iload.substring(iload.length - stopbit, iload.length);
                           exit = 1;
                       }
                  }
                }
              }


	      // NEW
	      var ret1 = creator_memory_findbytag(instructionParts[j]);
	      if (ret1.exit == 1)
	      {
                    var addr = ret1.value;
                    var bin  = parseInt(addr, 16).toString(2);
                    var startbit = pending_instructions[i].startBit;
                    var stopbit  = pending_instructions[i].stopBit;

                    instructionParts[j] = "0x" + addr.toString(16);
                    var newInstruction = "";
                    for (var w=0; w < instructionParts.length; w++)
	            {
                         newInstruction = newInstruction + instructionParts[w];
                         if (w != instructionParts.length-1){
                             newInstruction = newInstruction + " ";
                         }
                    }
                    for (var w=0; w < instructions.length; w++)
		    {
                         var aux = "0x" + (pending_instructions[i].address).toString(16);
                         if (aux == instructions[w].Address) {
                             instructions[w].loaded = newInstruction;
                         }
                    }

                    for (var w=0; w < instructions.length && exit == 0; w++)
		    {
                         var aux = "0x" + (pending_instructions[i].address).toString(16);
                         if (aux == instructions[w].Address)
			 {
                             instructions[w].loaded = newInstruction;
                             var fieldsLength = startbit - stopbit + 1;
	                     var iload        = instructions_binary[w - numBinaries].loaded;
                             instructions_binary[w - numBinaries].loaded = iload.substring(0, iload.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + iload.substring(iload.length - stopbit, iload.length);
                             exit = 1;
                         }
                    }
	      }

              if (exit == 0 && isNaN(instructionParts[j]) == true)
	      {
                //tokenIndex = 0;
                //nEnters = 0 ;
                //tokenIndex=pending_instructions[i].line;
                  nEnters=pending_instructions[i].line;
                  instructions = [];
                  pending_instructions = [];
                  pending_tags = [];
                  data_tag = [];
                  instructions_binary = [];
                  crex_memory_clear() ;
                  data = [];
                  extern = [];
                  return packCompileError('m7', instructionParts[j], "error", "danger");
              }
            }

            if (signatureParts[j] == "offset_words")
            {
              for (var z = 0; z < instructions.length && exit == 0; z++)
              {
                if(instructions[z].Label == instructionParts[j])
                {
                  var addr = instructions[z].Address;
                  var startbit = pending_instructions[i].startBit;
                  var stopbit = pending_instructions[i].stopBit;

                  addr = ((addr - pending_instructions[i].address)/4)-1;
                  console_log(instructionParts);
                  console_log(addr);
                  var bin = bi_intToBigInt(addr,10).toString(2);
                  bin = bin.substring((startbit-stopbit)+1,bin.length)

                  instructionParts[j] = addr;
                  var newInstruction = "";
                  for (var w = 0; w < instructionParts.length; w++) {
                    if(w == instructionParts.length-1){
                      newInstruction = newInstruction + instructionParts[w];
                    }
                    else{
                      newInstruction = newInstruction + instructionParts[w] + " ";
                    }
                  }
                  for (var w = 0; w < instructions.length && exit == 0; w++) {
                    var aux = "0x" + (pending_instructions[i].address).toString(16);
                    if(aux == instructions[w].Address){
                      instructions[w].loaded = newInstruction;
                    }
                  }

                  for (var w = 0; w < instructions.length && exit == 0; w++) {
                    var aux = "0x" + (pending_instructions[i].address).toString(16);
                    if(aux == instructions[w].Address){
                      instructions[w].loaded = newInstruction;
                      var fieldsLength = startbit - stopbit + 1;
                      console_log(w);
                      console_log(numBinaries);
                      console_log(w - numBinaries);
                      console_log(bin.padStart(fieldsLength, "0"));
                      instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                      exit = 1;
                    }
                  }
                }
              }

              if(exit == 0){
                //tokenIndex = 0;
                //nEnters = 0 ;
                //tokenIndex=pending_instructions[i].line;
                nEnters=pending_instructions[i].line;
                instructions = [];
                pending_instructions = [];
                pending_tags = [];
                data_tag = [];
                instructions_binary = [];
                crex_memory_clear() ;
                data = [];
                extern = [];
                return packCompileError('m7', instructionParts[j], "error", "danger");
              }
            }

            if(signatureParts[j] == "offset_bytes"){
              for (var z = 0; z < instructions.length && exit == 0; z++){
                if(instructions[z].Label == instructionParts[j]){
                  var addr = instructions[z].Address;
                  var startbit = pending_instructions[i].startBit;
                  var stopbit = pending_instructions[i].stopBit;

                  addr = ((addr - pending_instructions[i].address))-1;
                  var bin = bi_intToBigInt(addr,10).toString(2);
                  bin = bin.substring((startbit-stopbit)+1,bin.length)

                  instructionParts[j] = addr;
                  var newInstruction = "";
                  for (var w = 0; w < instructionParts.length; w++) {
                    if(w == instructionParts.length-1){
                      newInstruction = newInstruction + instructionParts[w];
                    }
                    else{
                      newInstruction = newInstruction + instructionParts[w] + " ";
                    }
                  }
                  for (var w = 0; w < instructions.length && exit == 0; w++) {
                    var aux = "0x" + (pending_instructions[i].address).toString(16);
                    if(aux == instructions[w].Address){
                      instructions[w].loaded = newInstruction;
                    }
                  }

                  for (var w = 0; w < instructions.length && exit == 0; w++) {
                    var aux = "0x" + (pending_instructions[i].address).toString(16);
                    if(aux == instructions[w].Address){
                      instructions[w].loaded = newInstruction;
                      var fieldsLength = startbit - stopbit + 1;
                      console_log(w)
                      console_log(numBinaries)
                      console_log(w - numBinaries)
                      instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                      exit = 1;
                    }
                  }
                }
              }

              if(exit == 0){
                //tokenIndex = 0;
                //nEnters = 0 ;
                //tokenIndex=pending_instructions[i].line;
                nEnters=pending_instructions[i].line;
                instructions = [];
                pending_instructions = [];
                pending_tags = [];
                data_tag = [];
                instructions_binary = [];
                crex_memory_clear() ;
                data = [];
                extern = [];
                return packCompileError('m7', instructionParts[j], "error", "danger");
              }
            }
          }
        }

        /* Enter the binary in the text segment */
        if (update_binary.instructions_binary != null)
        {
          for (var i = 0; i < update_binary.instructions_binary.length; i++)
          {
            var hex     = bin2hex(update_binary.instructions_binary[i].loaded);
            var auxAddr = parseInt(update_binary.instructions_binary[i].Address, 16);
            var label   = update_binary.instructions_binary[i].Label;
            var hide    = false ;

            if (i == 0) {
              hide = false;
              if(update_binary.instructions_binary[i].globl == false){
                label = "";
              }
            }
            else if(update_binary.instructions_binary[i].globl == false){
              hide  = true;
              label = "";
            }
            else if(update_binary.instructions_binary[i].globl == null){
              hide = true;
            }
            else {
              hide = false;
            }

            auxAddr = creator_insert_instruction(auxAddr, "********", "********", hide, hex, "**", label);
          }
	  // update UI (with new instructions)
          creator_memory_copytoapp(1) ;
        }

        /* Enter the compilated instructions in the text segment */
        for (var i = 0; i < instructions_binary.length; i++)
        {
          var hex = bin2hex(instructions_binary[i].loaded);
          var auxAddr = parseInt(instructions_binary[i].Address, 16);
          var label = instructions_binary[i].Label;
          var binNum = 0;

          if (update_binary.instructions_binary != null) {
              binNum = update_binary.instructions_binary.length
          }

          auxAddr = creator_insert_instruction(auxAddr, instructions[i + binNum].loaded, instructions[i + binNum].loaded, false, hex, "00", label);
        }
	// update UI (with new instructions)
        creator_memory_copytoapp(1) ;


        // Check for overlap
/* 
 * TODO: migrate to new memory model
 *
        if (memory[memory_hash[0]].length > 0)
        {
          if (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary[3].Addr > architecture.memory_layout[3].value) {
            //tokenIndex = 0;
            //nEnters = 0 ;
            instructions = [];
            pending_instructions = [];
            pending_tags = [];
            data_tag = [];
            instructions_binary = [];
            extern = [];
            crex_memory_clear() ;
            data = [];

            return packCompileError('m0', 'Data overflow', 'warning', "danger") ;
          }
        }

        if (memory[memory_hash[1]].length > 0)
        {
          if(memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary[3].Addr > architecture.memory_layout[1].value){
            //tokenIndex = 0;
            //nEnters = 0 ;
            instructions = [];
            pending_instructions = [];
            pending_tags = [];
            data_tag = [];
            instructions_binary = [];
            extern = [];
            crex_memory_clear() ;
            data = [];

            return packCompileError('m0', 'Instruction overflow', 'warning', "danger");
          }
        }
*/

        /*Save binary*/
        for(var i = 0; i < instructions_binary.length; i++){
          if(extern.length == 0 && instructions_binary[i].Label != ""){
            instructions_binary[i].Label = instructions_binary[i].Label + "_symbol";
            instructions_binary[i].globl = false;
          }
          else{
            for(var j = 0; j < extern.length; j++){
              if(instructions_binary[i].Label != extern[j] && j == extern.length-1 && instructions_binary[i].Label != ""){
                instructions_binary[i].Label = instructions_binary[i].Label + "_symbol";
                instructions_binary[i].globl = false;
                break;
              }
              else if(instructions_binary[i].Label == extern[j]){
                instructions_binary[i].globl = true;
                break;
              }
            }
          }
        }

        /*Save tags*/
        for(var i = 0; i < instructions_tag.length; i++){
          if(extern.length == 0 && instructions_tag[i].tag != ""){
            instructions_tag[i].tag = instructions_tag[i].tag + "_symbol";
            instructions_tag[i].globl = false;
            break;
          }
          else{
            for(var j = 0; j < extern.length; j++){
              if(instructions_tag[i].tag != extern[j] && j == extern.length-1 && instructions_tag[i].tag != ""){
                instructions_tag[i].tag = instructions_tag[i].tag + "_symbol";
                instructions_tag[i].globl = false;
                break;
              }
              else if(instructions_tag[i].tag == extern[j]){
                instructions_tag[i].globl = true;
                break;
              }
            }
          }
        }

        if (typeof app != "undefined")
            app._data.instructions = instructions;

        /* Initialize stack */
        creator_memory_stackinit(stack_address) ;
        creator_memory_copytoapp(2) ; // CHECK

        address = architecture.memory_layout[0].value;
        data_address = architecture.memory_layout[2].value;
        stack_address = architecture.memory_layout[4].value;

	// save current value as default values for reset()...
        creator_memory_prereset() ;

        return ret;
}

/*Compile data segment*/
function data_segment_compiler()
{
	var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;

        var existsData = true;

        next_token();
        while(existsData)
	{
          token = get_token();
          console_log("token: " + token);

          var label = "";

          if (token == null){
              break;
          }

          var found = false;
          if (token.search(/\:$/) != -1)
          {
              if (token.length == 1)
              {
                  return packCompileError('m0', "Empty label", 'error', "danger");
              }

              for (var i = 0; i < data_tag.length; i++)
              {
                   console_log(data_tag[i].tag);
                   console_log(token.substring(0,token.length-1))
                   if (data_tag[i].tag == token.substring(0,token.length-1)) {
                       return packCompileError('m1', token.substring(0,token.length-1), 'error', "danger") ;
                   }
              }

              for (var i = 0; i < instructions.length; i++)
	      {
                   if (instructions[i].Label == token.substring(0,token.length-1)) {
                       return packCompileError('m1', token.substring(0,token.length-1), 'error', "danger") ;
                   }
              }

              label = token.substring(0,token.length-1);
              next_token();
              token = get_token();
          }

          for (var j = 0; j < architecture.directives.length; j++)
	  {
            if (token == architecture.directives[j].name)
	    {
              switch (architecture.directives[j].action)
	      {
                case "byte":
                  var isByte = true;

                  next_token();

                  while(isByte){
                    token = get_token();

                    if (token == null) {
                        return packCompileError('m23', "", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if (token.search(re) != -1) {
                        return packCompileError('m24', token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");

                    console_log("byte, " + token)

                    var auxToken;
                    var auxTokenString;

                    if (token.match(/^\'(.*?)\'$/)) {
                        var re = /^\'(.*?)\'$/;
                        console_log(re);
                        var match = re.exec(token);
                        console_log(match);
                        var asciiCode;

                        console_log(match[1]);

                        if(token.search(/^\'\\n\'$/) != -1){
                          asciiCode = 10;
                        }
                        else if(token.search(/^\'\\t\'$/) != -1){
                          asciiCode = 9;
                        }
                        else{
                          asciiCode = match[1].charCodeAt(0);
                        }

                        console_log(asciiCode);
                        auxTokenString = asciiCode.toString(16);
                    }
                    else if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if(value[1].search(re) == -1){
                        return packCompileError('m15', token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if(value[1].length == 0){
                        return packCompileError('m19', token, 'error', "danger") ;
                      }

                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    else{
                      var re = new RegExp("[0-9-]{"+token.length+"}","g");
                      if (token.search(re) == -1) {
                          return packCompileError('m15', token, 'error', "danger") ;
                      }
                      auxToken = parseInt(token) >>> 0;
                      auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                      if (auxTokenString.length > 2*architecture.directives[j].size) {
                         return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }

                    console_log(auxTokenString)

                    ret = data_compiler(auxTokenString, architecture.directives[j].size, label, (parseInt(auxTokenString, 16) >> 0), "byte")
                    if (ret.status != 'ok') {
                        return ret ;
                    }

                    label = null;

                    console_log("byte Terminado");

                    next_token();
                    token = get_token();
                    console_log("token: " + token);

                    for (var z = 0; z < architecture.directives.length; z++) {
                         if (token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                             isByte = false;
                         }
                    }
                  }

                  j=0;

                  break;

                case "half_word":
                  console_log("half_word")
                  var ishalf = true;

                  next_token();
                  while(ishalf)
                  {
                    token = get_token();
                    if (token == null) {
                        return packCompileError('m23',"", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if (token.search(re) != -1) {
                        return packCompileError('m24', token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");

                    console_log("half_word, " + token);

                    var auxToken;
                    var auxTokenString;
                    if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if (value[1].search(re) == -1) {
                         return packCompileError('m15', token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");

                      if (value[1].length == 0) {
                          return packCompileError('m19', token, 'error', "danger") ;
                      }
                      if (auxTokenString.length > 2*architecture.directives[j].size) {
                          return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    else{
                      var re = new RegExp("[0-9-]{"+token.length+"}","g");
                      if (token.search(re) == -1) {
                          return packCompileError('m15', token, 'error', "danger") ;
                      }
                      auxToken = parseInt(token) >>> 0;
                      auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                      if (auxTokenString.length > 2*architecture.directives[j].size) {
                          return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }

                    console_log(auxTokenString)

                    ret = data_compiler(auxTokenString, architecture.directives[j].size, label, (parseInt(auxTokenString, 16) >> 0), "half")
                    if (ret.status != 'ok') {
                        return ret ;
                    }

                    label = null;

                    console_log("half Terminado");

                    next_token();
                    token = get_token();
                    console_log("token: " + token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                        ishalf = false;
                      }
                    }
                  }

                  j=0;
                  break;

                case "word":
                  var isWord = true;
                  next_token();

                  while(isWord){
                    console_log("word")

                    token = get_token();
                    if (token == null) {
                        return packCompileError('m23', "", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if (token.search(re) != -1) {
                        return packCompileError('m24', token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");
                    console_log("token: " + token);

                    var auxToken;
                    var auxTokenString;
                    if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if(value[1].search(re) == -1){
                        return packCompileError('m15', token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if(value[1].length == 0){
                        return packCompileError('m19', token, 'error', "danger") ;
                      }
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    else{
                      var re = new RegExp("[0-9-]{"+token.length+"}","g");
                      if(token.search(re) == -1){
                        return packCompileError('m15', token, 'error', "danger") ;
                      }
                      auxToken = parseInt(token) >>> 0;
                      auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }

                    console_log(auxTokenString);

                    ret = data_compiler(auxTokenString, architecture.directives[j].size, label, (parseInt(auxTokenString, 16)) >> 0, "word")
                    if (ret.status != 'ok') {
                        return ret ;
                    }
                    label = null;

                    console_log("word Terminado");

                    next_token();
                    token = get_token();
                    console_log("token: " + token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){

                        isWord = false;
                      }
                    }
                  }

                  j=0;
                  break;

                case "double_word":
                  var isDoubleWord = true;

                  next_token();

                  while(isDoubleWord){
                    console_log("word");

                    token = get_token();

                    if(token == null){
                      return packCompileError('m23', "", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if(token.search(re) != -1){
                      return packCompileError('m24', token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");
                    console_log("token: " + token);

                    var auxToken;
                    var auxTokenString;
                    if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if(value[1].search(re) == -1){
                        return packCompileError('m15', token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if(value[1].length == 0){
                        return packCompileError('m19', token, 'error', "danger") ;
                      }
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    else{
                      var re = new RegExp("[0-9-]{"+token.length+"}","g");
                      if(token.search(re) == -1){
                        return packCompileError('m15', token, 'error', "danger") ;
                      }
                      auxToken = parseInt(token) >>> 0;
                      auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }

                    ret = data_compiler(auxTokenString, architecture.directives[j].size, label, (parseInt(auxTokenString, 16) >> 0), "double_word")
                    if (ret.status != 'ok') {
                        return ret ;
                    }

                    label = null;

                    console_log("double word Terminado");

                    next_token();
                    token = get_token();
                    console_log("token: " + token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                        isDoubleWord = false;
                      }
                    }
                  }

                  j=0;
                  break;

                case "float":
                  var isFloat = true;

                  next_token();

                  while(isFloat){
                    console_log("float");

                    token = get_token();

                    if(token == null){
                      return packCompileError('m23', "", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if(token.search(re) != -1){
                      return packCompileError('m24', token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");
                    console_log("token: " + token);

                    var auxToken;
                    var auxTokenString;
                    if(token == "-Inf" || token == "-inf" || token == "-Infinity" || token == "-infinity"){
                      token = "-Infinity";
                      auxTokenString = "FF800000";
                    }
                    else if(token == "Inf" || token == "+Inf" || token == "inf" || token == "+inf" || token == "Infinity" || token == "+Infinity" || token == "infinity" || token == "+infinity"){
                      token = "+Infinity";
                      auxTokenString = "7F800000";
                    }
                    else if(token == "NaN" || token == "nan"){
                      token = "NaN";
                      auxTokenString = "7FC00000";
                    }
                    else if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if(value[1].search(re) == -1){
                        return packCompileError('m15', token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if(value[1].length == 0){
                        return packCompileError('m19', token, 'error', "danger") ;
                      }
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                      token = hex2float(token);
                    }
                    else{
                      var re = new RegExp("[\+e0-9.-]{"+token.length+"}","g");
                      if(token.search(re) == -1){
                        return packCompileError('m15', token, 'error', "danger") ;
                      }
                      auxToken = parseFloat(token, 10);
                      auxTokenString = (bin2hex(float2bin(auxToken))).padStart(2*architecture.directives[j].size, "0");
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }

                    console_log(auxTokenString);

                    data_compiler(auxTokenString, architecture.directives[j].size, label, token, "float")
                    if (ret.status != 'ok') {
                      return ret ;
                    }

                    label = null;

                    console_log("float Terminado");

                    next_token();
                    token = get_token();
                    console_log("token: " + token);

                    for (var z = 0; z < architecture.directives.length; z++) {
                      if (token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                          isFloat = false;
                      }
                    }
                  }

                  j=0;
                  break;

             case "double":
                  var isDouble = true;

                  next_token();

                  while(isDouble){
                    console_log("double");

                    token = get_token();
                    if (token == null) {
                        return packCompileError('m23', "", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if (token.search(re) != -1) {
                        return packCompileError('m24', token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");
                    console_log("token: " + token);

                    var auxToken;
                    var auxTokenString;
                    if(token == "-Inf" || token == "-inf" || token == "-Infinity" || token == "-infinity"){
                      token = "-Infinity";
                      auxTokenString = "FFF0000000000000";
                    }
                    else if(token == "Inf" || token == "+Inf" || token == "inf" || token == "+inf" || token == "Infinity" || token == "+Infinity" || token == "infinity" || token == "+infinity"){
                      token = "+Infinity";
                      auxTokenString = "7FF0000000000000";
                    }
                    else if(token == "NaN" || token == "nan"){
                      token = "NaN";
                      auxTokenString = "7FF8000000000000";
                    }
                    else if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if (value[1].search(re) == -1) {
                          return packCompileError('m15', token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if (value[1].length == 0) {
                          return packCompileError('m19', token, 'error', "danger") ;
                      }
                      if (auxTokenString.length > 2*architecture.directives[j].size) {
                          return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                      token = hex2double(token);
                    }
                    else{
                      var re = new RegExp("[\+e0-9.-]{"+token.length+"}","g");
                      if (token.search(re) == -1) {
                          return packCompileError('m15', token, 'error', "danger") ;
                      }
                      auxToken = parseFloat(token, 10); console_log(auxTokenString);
                      auxTokenString = (bin2hex(double2bin(auxToken))).padStart(2*architecture.directives[j].size, "0");
                      if (auxTokenString.length > 2*architecture.directives[j].size) {
                          return packCompileError('m18', token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }

                    console_log(auxTokenString);

                    data_compiler(auxTokenString, architecture.directives[j].size, label, token, "double")
                    if (ret.status != 'ok') {
                        return ret ;
                    }

                    label = null;

                    console_log("double Terminado");

                    next_token();
                    token = get_token();
                    console_log("token: " + token);

                    for (var z = 0; z < architecture.directives.length; z++)
                    {
                        if (token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1) {
                            isDouble = false;
                        }
                    }
                  }

                  j=0;
                  break;

                case "ascii_not_null_end":
                  console_log("ascii_not_null_end");

                  var isAscii = true;
                  var nextToken = 1;

                  next_token();
                  while(isAscii)
		  {
                    token = get_token();
                    console_log("token: " + token);

                    string = token;

                    re = new RegExp('^"');
                    if (string.search(re) != -1){
	                string = string.replace(re, "");
	                console_log(string);
		    }
		    else {
			return packCompileError('m16', "", 'error', "danger") ;
		    }

                    re = new RegExp('"$');
                    if (string.search(re) != -1){
	                    string = string.replace(re, "");
	                    console_log(string);
		    }
		    else{
		    	return packCompileError('m17', "", 'error', "danger") ;
		    }

                    if (token == null) {
                        break;
                    }

                    data_address = creator_memory_storestring(string, string.length, data_address, label, "ascii", align);

                    console_log("ascii_not_null_end Terminado");

                    if (nextToken == 1) {
                        next_token();
                        token = get_token();
                        console_log("token: " + token);
                    }

                    nextToken = 1;

                    for (var z = 0; z < architecture.directives.length; z++){
                      if (token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                          isAscii = false;
                      }
                    }
                  }

                  j=0;
                  break;

                case "ascii_null_end":
                  console_log("ascii_null_end");

                  var isAscii = true;
                  var nextToken = 1;

                  next_token();

                  while(isAscii)
		  {
                    console_log("ascii_null_end")

                    token = get_token();
                    console_log("token: " + token);

                    if (token == null) {
                        break;
                    }

                    string = token;

                    re = new RegExp('^"');
                    if(string.search(re) != -1){
	                    string = string.replace(re, "");
	                    console_log(string);
	                }
	                else{
	                	return packCompileError('m16', "", 'error', "danger") ;
	                }
                    re = new RegExp('"$');
                    if(string.search(re) != -1){
	                    string = string.replace(re, "");
	                    console_log(string);
	                }
	                else{
	                	return packCompileError('m17', "", 'error', "danger") ;
	                }

                    data_address = creator_memory_storestring(string, string.length, data_address, label, "asciiz", align);

                    console_log("ascii_null_end Terminado");

                    if (nextToken == 1) {
                        next_token();
                        token = get_token();
                        console_log("token: " + token);
                    }

                    nextToken = 1;

                    for (var z = 0; z < architecture.directives.length; z++){
                      if (token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                          isAscii = false;
                      }
                    }
                  }

                  j=0;
                  break;

                case "space":
                  console_log("space");

                  var string = "";

                  next_token();
                  token = get_token();
                  console_log("token: " + token);

                  if (token == null){
                      return packCompileError('m23', "", 'error', "danger") ;
                  }

                  var re = new RegExp("[0-9-]{"+token.length+"}","g");
                  if (token.search(re) == -1){
                      return packCompileError('m15', token, 'error', "danger") ;
                  }

                  if (parseInt(token) < 0){
                      return packCompileError('m22', token, 'error', "danger") ;
                  }

                  if (parseInt(token) > 50*1024*1024){
                      return packCompileError('m10', token, 'error', "danger") ;
                  }

                  var size = parseInt(token) * architecture.directives[j].size;
                  data_address = creator_memory_storestring(size, size, data_address, label, "space", align);

                  next_token();
                  token = get_token();
                  console_log("token: " + token);

                  console_log("space Terminado");
                  break;

                case "align":
                case "balign":
                  console_log("[b]align");
                  let pow_mode = token == ".align";

                  next_token();
                  token = get_token();
                  console_log("token: " + token);

                  if (token == null){
                      return packCompileError('m23', "", 'error', "danger") ;
                  }

                  var re = new RegExp("[0-9-]{"+token.length+"}","g");
                  if (token.search(re) == -1){
                      return packCompileError('m15', token, 'error', "danger") ;
                  }

                  if (parseInt(token) < 0){
                      return packCompileError('m22', token, 'error', "danger") ;
                  }

                  align = pow_mode ? Math.pow(2, parseInt(token)) : token;
                  console_log(align);

                  next_token();
                  token = get_token();
                  console_log("token: " + token);

                  console_log("align Terminado");
                  break;

                default:
                  console_log("Default");
                  existsData = false;
                  break;
              }
            }
            else if (j== architecture.directives.length-1 && token != architecture.directives[j].name && token != null && token.search(/\:$/) == -1)
            {
                creator_memory_prereset() ;
                creator_memory_copytoapp(0) ;
                return ret;
            }

          }
        }

        creator_memory_prereset() ;
        creator_memory_copytoapp(0) ;
        return ret;
}

/* Stores a data in data memory */
function data_compiler ( value, size, dataLabel, DefValue, type )
{
	var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;

        var r = crex_memory_data_compiler(value, size, dataLabel, DefValue, type) ;
        if (r != "") {
            return packCompileError(r, "", 'error', "danger") ;
        }

        return ret;
}

/*Compile text segment*/
function code_segment_compiler()
{
	var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;

        var existsInstruction = true;

        next_token();
        var instInit = tokenIndex;

        while(existsInstruction){
          token = get_token();

          for(var i = 0; i < architecture.directives.length; i++){
            if(token == architecture.directives[i].name && architecture.directives[i].action == "global_symbol"){
              next_token(); // .globl *main*
              next_token();
              token = get_token();
            }
            else if(token == architecture.directives[i].name){

              if (typeof app !== "undefined")
                  app._data.instructions = instructions;

              console_log("token: " + token);
              for(var i = 0; i < instructions.length; i++){
                if(instructions[i].Label != ""){
                  instructions_tag.push({tag: instructions[i].Label, addr: parseInt(instructions[i].Address, 16)});
                  tag_instructions[parseInt(instructions[i].Address, 16)] = instructions[i].Label;
                }
              }

              return ret;
            }
          }

          var label = "";
          var validTagPC = true;

          if(token == null){
            break;
          }

          console_log("token: " + token);

          var found = false;
          var end = false;

          if (token.search(/\:$/) != -1)
          {
              if (token.length == 1){
                  return packCompileError('m0', "Empty label", 'error', "danger") ;
              }

	      var ret1 = creator_memory_findbytag(token.substring(0, token.length-1));
	      if (ret1.exit == 1)
	      {
                  return packCompileError('m1', token.substring(0,token.length-1), 'error', "danger") ;
	      }

              for (var i = 0; i < instructions.length; i++) {
                   if (instructions[i].Label == token.substring(0,token.length-1)) {
                       return packCompileError('m1', token.substring(0,token.length-1), 'error', "danger") ;
                   }
              }

              label = token.substring(0,token.length-1);
              next_token();
              instInit = tokenIndex;
              token = get_token();

              if (token != null)
	      {
                  var re = new RegExp(",+$");
                  token = token.replace(re, "");
              }
              else
	      {
                  var instIndex;
                  for (var i = 0; i < architecture.instructions.length; i++) {
                    if (architecture.instructions[i].name == "nop") {
                        instIndex = i;
                    }
                  }
                  instruction_compiler("nop", "nop", label, tokenIndex, false, 0, instInit, instIndex, false);
                  end = true;
                  found = true;
              }
          }

          var re = new RegExp(",+$");

          if(token != null){
            token = token.replace(re, "");
            console_log("token: " + token)
            var stopFor = false;
          }


          for(var i = 0; i < architecture.instructions.length && stopFor == false && end == false; i++){
            if(architecture.instructions[i].name != token){
              continue;
            }

            else{
              var instruction = "";
              var userInstruction = "";

              var numFields = 0;
              found = true;

              for (var j = 0; j < architecture.instructions[i].fields.length; j++){
                if(architecture.instructions[i].fields[j].type != "cop"){
                  numFields++;
                }
              }
              console_log(numFields);

              instruction = instruction + token;
              userInstruction = userInstruction + token;

              //var new_ins = 0;

              for (var j = 0; j < numFields - 1; j++){
                next_token();
                token = get_token();
                console_log("token: " + token);

                if(token != null){
                  var re = new RegExp(",+$");
                  token = token.replace(re, "");
                  instruction = instruction + " " + token;
                  userInstruction = userInstruction + " " + token;
                }
              }

              console_log(instruction);
              console_log(label);

              ret = instruction_compiler(instruction, userInstruction, label, tokenIndex, false, 0, instInit, i, false);
              if (ret.status != 'ok'){
                  return ret ;
              }

              next_token();
              instInit = tokenIndex; //PRUEBA
              stopFor = true;
            }
          }

          if(!found){
            var resultPseudo = -3;
            var instruction = "";
            var numToken = 0;
            var exists = false;
            var inst = token;

            console_log("token: " + token)

            for (var i = 0; i < architecture.pseudoinstructions.length && exists == false; i++){
              if(architecture.pseudoinstructions[i].name == token){
                numToken = architecture.pseudoinstructions[i].fields.length;
                console_log(numToken)
                exists = true;
                instruction = instruction + token;

                for (var i = 0; i < numToken; i++){
                  next_token();
                  token = get_token();

                  if(token != null){
                    var re = new RegExp(",+$");
                    token = token.replace(re, "");
                  }

                  instruction = instruction + " " + token;
                }
                resultPseudo = pseudoinstruction_compiler(instruction, label, tokenIndex);
                console_log(resultPseudo);

                if (resultPseudo.status != 'ok') {
                  return resultPseudo;
                }
              }
            }

            //TODO: revisar funcionamiento
            if(resultPseudo == -3){
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  var re = new RegExp(architecture.components[i].elements[j].name.join('|')); //TODO: check

                  if(token.search(re) != -1){
                    existsInstruction = false;
                    //tokenIndex = 0;
                    //nEnters = 0 ;
                    instructions = [];
                    pending_instructions = [];
                    pending_tags = [];
                    data_tag = [];
                    instructions_binary = [];
                    extern = [];
                    crex_memory_clear() ;
                    data = [];
                 // ret = packCompileError('m26', (textarea_assembly_editor.posFromIndex(tokenIndex).line) + 1,
                 //                        'error', "danger") ;
                    ret = packCompileError('m26', nEnters+1, 'error', "danger") ;

                    return ret;
                  }
                }
              }



              existsInstruction = false;
              //tokenIndex = 0;
              //nEnters = 0 ;
              instructions = [];
              pending_instructions = [];
              pending_tags = [];
              data_tag = [];
              instructions_binary = [];
              extern = [];
              crex_memory_clear() ;
              data = [];

              ret = packCompileError('m2', token, 'error', "danger");
              return ret;
            }

            if(resultPseudo == -2){


              existsInstruction = false;
              //tokenIndex = 0;
              //nEnters = 0 ;
              instructions = [];
              pending_instructions = [];
              pending_tags = [];
              data_tag = [];
              instructions_binary = [];
              extern = [];
              data = [];
              crex_memory_clear() ;

              //PRUEBA para dar error con mas detalle
              ret = packCompileError('m2', token, 'error', "danger");

              return ret;
            }

            if(resultPseudo == -1){
              existsInstruction = false;
              //tokenIndex = 0;
              //nEnters = 0 ;
              instructions = [];
              pending_instructions = [];
              pending_tags = [];
              data_tag = [];
              instructions_binary = [];
              extern = [];
              data = [];
              crex_memory_clear() ;
              ret = packCompileError('m24', "", 'error', "danger") ;
              return ret;
            }

            next_token();
            instInit = tokenIndex; //PRUEBA

          }
        }

        token = get_token();
        console_log("token: " + token);


        if (typeof app !== "undefined")
            app._data.instructions = instructions;

        for(var i = 0; i < instructions.length; i++){
          if(instructions[i].Label != ""){
            instructions_tag.push({tag: instructions[i].Label, addr: parseInt(instructions[i].Address, 16)});
            tag_instructions[parseInt(instructions[i].Address, 16)] = instructions[i].Label;
          }
        }

        return ret;
}


/*Compile instruction*/
function instruction_compiler ( instruction, userInstruction, label, line,
				pending, pendingAddress, instInit, instIndex, isPseudo )
{
  var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;


  if(instIndex == null){
    instIndex = 0;
  }
  console_log(instruction);
  console_log(instIndex);
  var re = new RegExp("^ +");
  var oriInstruction = instruction.replace(re, "");

  re = new RegExp(" +", "g");
  oriInstruction = oriInstruction.replace(re, " ");

  var instructionParts = oriInstruction.split(' ');
  var validTagPC = true;
  var startBit;
  var stopBit;
  var resultPseudo = -3;

  console_log(label);
  console_log(line);

  var stopFor = false;

  for(var i = instIndex; i < architecture.instructions.length && stopFor == false; i++){
    if(architecture.instructions[i].name != instructionParts[0]){
      continue;
    }
    else{
      var auxSignature = architecture.instructions[i].signatureRaw;

      var tag = "";

      var binary = "";
      binary = binary.padStart(architecture.instructions[i].nwords * 32, "0");

      var instruction = architecture.instructions[i].signature_definition;
      var userInstruction = userInstruction;

      var signatureDef = architecture.instructions[i].signature_definition;
      signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      re = new RegExp("[fF][0-9]+", "g");
      signatureDef = signatureDef.replace(re, "(.*?)");

      re = new RegExp(",", "g");
      var signature = architecture.instructions[i].signature.replace(re, " ");

      re = new RegExp(signatureDef+"$");
      var match = re.exec(signature);
      var signatureParts = [];
      for(var j = 1; j < match.length; j++){
        signatureParts.push(match[j]);
      }

      match = re.exec(architecture.instructions[i].signatureRaw);
      var signatureRawParts = [];
      for(var j = 1; j < match.length; j++){
        signatureRawParts.push(match[j]);
      }

      console_log(signatureParts);
      console_log(signatureRawParts);

      re = new RegExp(signatureDef+"$");
      console_log(re);
      if(oriInstruction.search(re) == -1){
        if(isPseudo == false){
          console_log(get_token())

          tokenIndex = instInit;
          token = get_token();

          console_log("token: " + token);
        }
        else{
          token = instructionParts[0];
        }

        var resultPseudo = null;
        var instruction = "";
        var numToken = 0;

        console_log("token: " + token)

        for(var i = i + 1; i < architecture.instructions.length; i++){
          if(architecture.instructions[i].name == token){

            var index = i;
            numToken = architecture.instructions[i].fields.length;
            instruction = instruction + token;

            for (var a = 1; a < numToken; a++){
              if(architecture.instructions[i].fields[a].type != "cop"){
                if(isPseudo == false){
                  next_token();
                  token = get_token();

                  if(token != null){
                    var re = new RegExp(",+$");
                    token = token.replace(re, "");
                  }
                }
                else{
                  token = instructionParts[a];
                }

                instruction = instruction + " " + token;
                console_log(instruction);
              }
            }
            if(isPseudo == false){
              ret = instruction_compiler(instruction, instruction, label, line, pending, pendingAddress, instInit, index, false);
            }
            else{
              ret = instruction_compiler(instruction, userInstruction, label, line, pending, pendingAddress, instInit, index, false);
            }
            return ret;
          }
        }




        for (var i = 0; i < architecture.pseudoinstructions.length; i++){
          if(architecture.pseudoinstructions[i].name == token){
            numToken = architecture.pseudoinstructions[i].fields.length;

            instruction = instruction + token;

            for (var i = 0; i < numToken; i++){
              next_token();
              token = get_token();

              if(token != null){
                var re = new RegExp(",+$");
                token = token.replace(re, "");
              }

              instruction = instruction + " " + token;
            }
            console_log(instruction);
            resultPseudo = pseudoinstruction_compiler(instruction, label, tokenIndex);

            console_log(resultPseudo)

            if (resultPseudo.status == 'ok') {
                return resultPseudo ;
            }
            if (resultPseudo.errorcode == 3) {
                return resultPseudo ;
            }
          }
        }
      }

      if (resultPseudo == null) {
          return packCompileError('m3', auxSignature, 'error', "danger") ;
      }

      console_log(oriInstruction);
      console_log(re)
      match = re.exec(oriInstruction);
      instructionParts = [];
      if (match != null) {
          for (var j = 1; j < match.length; j++) {
               instructionParts.push(match[j]);
          }
      }
      else {
        return packCompileError('m3', auxSignature, 'error', "danger") ;
      }

      console_log(instructionParts);

      //PRUEBA
      re = new RegExp("[fF][0-9]+");
      while(instruction.search(re) != -1){
        re = new RegExp("[fF]([0-9]+)");
        var match = re.exec(instruction);
        re = new RegExp("[fF][0-9]+");
        instruction = instruction.replace(re, "Field"+match[1]);
      }


      for(var j = 0; j < signatureParts.length; j++){
        console_log(signatureParts[j]);
        switch(signatureParts[j]) {
          case "INT-Reg":
            token = instructionParts[j];

            console_log("token: " + token);

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(architecture.components[z].elements[w].name.includes(token) != false && architecture.components[z].type == "integer"){ //TODO:check
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = w;

                      if (reg.toString(2).length > fieldsLength) {
                          return packCompileError('m12', token, 'error', "danger") ;
                      }

                      console_log(reg)
                      console_log((reg.toString(2)).padStart(fieldsLength, "0"))
                      console_log(binary)
                      console_log(binary.length)
                      console_log(architecture.instructions[i].fields[a].startbit + 1)
                      console_log(binary.length - (architecture.instructions[i].fields[a].startbit + 1))

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);

                      console_log(binary);

                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }

                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      return packCompileError('m4', token, 'error', "danger") ;
                    }
                    regNum++;
                  }
                }
              }
            }

            break;

          case "SFP-Reg":
            token = instructionParts[j];

            console_log("token: " + token);

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(architecture.components[z].elements[w].name.includes(token) != false && architecture.components[z].type == "floating point" && architecture.components[z].double_precision == false){ //TODO:check
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){

                        return packCompileError('m12', token, 'error', "danger") ;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      console_log(instruction);
                      instruction = instruction.replace(re, token);
                      console_log(instruction);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      return packCompileError('m4', token, 'error', "danger") ;
                    }
                    if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == false){
                      regNum++;
                    }
                  }
                }
              }
            }

            break;

          case "DFP-Reg":
            token = instructionParts[j];

            console_log("token: " + token);

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(architecture.components[z].elements[w].name.includes(token) != false && architecture.components[z].type == "floating point" && architecture.components[z].double_precision == true){ //TODO:check
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){

                        return packCompileError('m12', token, 'error', "danger") ;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      return packCompileError('m4', token, 'error', "danger") ;
                    }
                    if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == true){
                      regNum++;
                    }
                  }
                }
              }
            }

            break;

          case "Ctrl-Reg":
            token = instructionParts[j];

            console_log("token: " + token)

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(architecture.components[z].elements[w].name.includes(token) != false && architecture.components[z].type == "control"){ //TODO: check
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){

                        return packCompileError('m12', token, 'error', "danger") ;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      return packCompileError('m4', token, 'error', "danger") ;
                    }
                    if(architecture.components[z].type == "control"){
                      regNum++;
                    }
                  }
                }
              }
            }

            break;

          case "inm-signed":
            token = instructionParts[j];
            var token_user = "";

            console_log("token: " + token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){

                fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);

                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if(value[1].length*4 > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }
                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if(float2bin(parseFloat(token)).length > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }
                  }

                  if (isNaN(parseFloat(token)) == true) {
                      return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(token.match(/^\'(.*?)\'$/)){
                  var re = /^\'(.*?)\'$/;
                  console_log(re);
                  var match = re.exec(token);
                  console_log(match);
                  var asciiCode = match[1].charCodeAt(0);
                  console_log(asciiCode);

                  re = RegExp("Field[0-9]+");
                  instruction = instruction.replace(re, asciiCode);

                  inm = (asciiCode >>> 0).toString(2);
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else {

                  var comNumPos = Math.pow(2, fieldsLength-1);
                  var comNumNeg = comNumPos * (-1);
                  comNumPos = comNumPos -1;

                  console_log(comNumPos);
                  console_log(comNumNeg);

                  if(parseInt(token, 10) > comNumPos || parseInt(token, 10) < comNumNeg){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);
                    console_log(resultPseudo);

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }
                  }

                  if (isNaN(parseInt(token)) == true && resultPseudo == -3) {
                      return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                  inm = inm.substring(inm.length - fieldsLength ,inm.length);
                }
                if(validTagPC == true){
                  console_log(inm.length);
                  if (inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)) {

                      return packCompileError('m12', token, 'error', "danger") ;
                  }

                  binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
                }

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                instruction = instruction.replace(re, token);
              }
            }

            break;

          case "inm-unsigned":
            token = instructionParts[j];
            var token_user = "";

            console_log("token: " + token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){

                if (!architecture.instructions[i].separated || !architecture.instructions[i].separated[a])
                  fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                else {
                  fieldsLength = architecture.instructions[i].fields[a].startbit
                    .map((b, iii) => b - architecture.instructions[i].fields[a].stopbit[iii]+1)
                    .reduce((old, newV) => old+newV);
                }

                //fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);

                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if (value[1].length*4 > fieldsLength)
                  {
                      resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                      console_log(resultPseudo);

                      if (resultPseudo.status != 'ok'){
                          return resultPseudo ;
                      }
                  }

                  if (isNaN(parseInt(token, 16)) == true) {
                      return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/))
                {
                  if (float2bin(parseFloat(token)).length > fieldsLength) {
                      resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);
                      console_log(resultPseudo);
                      if (resultPseudo.status != 'ok') {
                          return resultPseudo ;
                      }
                  }

                  if (isNaN(parseFloat(token)) == true) {
                      return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(token.match(/^\'(.*?)\'$/)) {
                  var re = /^\'(.*?)\'$/;
                  console_log(re);
                  var match = re.exec(token);
                  console_log(match);
                  var asciiCode = match[1].charCodeAt(0);
                  console_log(asciiCode);

                  re = RegExp("Field[0-9]+");
                  instruction = instruction.replace(re, asciiCode);

                  inm = (asciiCode >>> 0).toString(2);
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else {

                  var comNumPos = Math.pow(2, fieldsLength);

                  console_log(comNumPos);

                  if(parseInt(token, 10) > comNumPos){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);
                    console_log(resultPseudo);
                    if (resultPseudo.status != 'ok') {
                        return resultPseudo ;
                    }
                  }

                  if (isNaN(parseInt(token)) == true && resultPseudo == -3) {
                      return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                  inm = inm.substring(inm.length - fieldsLength ,inm.length);
                }
                if(validTagPC == true){
                  console_log(inm.length);
                  if (inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)) {
                     return packCompileError('m12', token, 'error', "danger") ;
                  }

                  binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
                }

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                instruction = instruction.replace(re, token);
              }
            }

            break;

          case "address":
            token = instructionParts[j];

            console_log("token: " + token)

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                //aqui
                fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);

                if(token.match(/^0x/)){
                  var value = token.split("x");

                  if (value[1].length*4 > fieldsLength) {
                     return packCompileError('m8', token, 'error', "danger") ;
                  }

                  if (isNaN(parseInt(token, 16)) == true) {
                      return packCompileError('m9', token, 'error', "danger") ;
                  }

                  addr = (parseInt(token, 16)).toString(2);
                  //binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + addr.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                  binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
                  //re = RegExp("[fF][0-9]+");
                  re = RegExp("Field[0-9]+");
                  instruction = instruction.replace(re, token);
                }
                else{
                  var validTag = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
              }
            }

            break;

          case "offset_bytes":
            token = instructionParts[j];
            var token_user = "";

            console_log("token: " + token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                  fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);

                var inm;

                if(token.match(/^0x/))
                {
                   var value = token.split("x");
                   if (value[1].length*4 > fieldsLength)
                   {
                      resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);
                      console_log(resultPseudo);
                      if (resultPseudo.status != 'ok'){
                          return resultPseudo ;
                      }
                   }

                   if (isNaN(parseInt(token, 16)) == true) {
                       return packCompileError('m6', token, 'error', "danger") ;
                   }

                   inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if (float2bin(parseFloat(token)).length > fieldsLength)
                  {
                     resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);
                     console_log(resultPseudo);
                     if (resultPseudo.status != 'ok'){
                         return resultPseudo ;
                     }
                  }

                  if (isNaN(parseFloat(token)) == true) {
                      return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else {

                  var comNumPos = Math.pow(2, fieldsLength-1);
                  var comNumNeg = comNumPos * (-1);
                  comNumPos = comNumPos -1;

                  console_log(comNumPos);
                  console_log(comNumNeg);

                  if (parseInt(token, 10) > comNumPos || parseInt(token, 10) < comNumNeg)
                  {
                      console_log(oriInstruction)
                      console_log(label)
                      console_log(line)
                      resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);
                      console_log(resultPseudo);
                      if (resultPseudo.status != 'ok') {
                          return resultPseudo ;
                      }
                   }

                  if (isNaN(parseInt(token)) == true && resultPseudo == -3) {
                     return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                  inm = inm.substring(inm.length - fieldsLength ,inm.length);
                }
                if(validTagPC == true){
                  if(inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)){
                    return packCompileError('m12', token, 'error', "danger") ;
                  }

                  //binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                  binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
                }

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                console_log(instruction);
                instruction = instruction.replace(re, token);
                console_log(instruction);
              }
            }

            break;

          case "offset_words":
            token = instructionParts[j];
            var token_user = "";

            console_log("token: " + token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);

                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if (value[1].length*4 > fieldsLength)
                  {
                     resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);
                     console_log(resultPseudo);
                     if (resultPseudo.status != 'ok'){
                         return resultPseudo ;
                     }
                  }

                  if (isNaN(parseInt(token, 16)) == true) {
                     return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if (float2bin(parseFloat(token)).length > fieldsLength)
                  {
                     resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);
                     console_log(resultPseudo);
                     if (resultPseudo.status != 'ok'){
                         return resultPseudo ;
                     }
                  }

                  if (isNaN(parseFloat(token)) == true) {
                      return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else{

                  var comNumPos = Math.pow(2, fieldsLength-1);
                  var comNumNeg = comNumPos * (-1);
                  comNumPos = comNumPos -1;

                  console_log(comNumPos);
                  console_log(comNumNeg);

                  if (parseInt(token, 10) > comNumPos || parseInt(token, 10) < comNumNeg)
                  {
                      console_log(oriInstruction)
                      console_log(label)
                      console_log(line)
                      resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);
                      console_log(resultPseudo);
                      if (resultPseudo.status != 'ok'){
                          return resultPseudo ;
                      }
                  }

                  if (isNaN(parseInt(token)) == true && resultPseudo == -3) {
                      return packCompileError('m6', token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                  inm = inm.substring(inm.length - fieldsLength ,inm.length);

                }
                if(validTagPC == true){
                  if(inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)){
                      return packCompileError('m12', token, 'error', "danger") ;
                  }
                  //binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                  binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
                }

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                console_log(instruction);
                instruction = instruction.replace(re, token);
                console_log(instruction);
              }
            }

            break;

          default:
            token = instructionParts[j];

            console_log("token: " + token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              console_log(architecture.instructions[i].fields[a].name);
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                // Si el co es un array hay que separarlo
                /**/
                if (typeof(architecture.instructions[i].fields[a].startbit) == 'object') {
                    fieldsLength = architecture.instructions[i].fields[a].startbit.reduce((t, cv, ind) => {
                      t = !ind ? 0 : t;
                      t+(cv-architecture.instructions[i].fields[a].stopbit[ind]+1)
                    });
                    console_log(architecture.instructions[i].co.join("").padStart(fieldsLength, "0"));
                    // aqui_ahora
                } else {
                  fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
console_log((architecture.instructions[i].co).padStart(fieldsLength, "0"));
                  binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (architecture.instructions[i].co).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit), binary.length);
                }

                console_log(binary);

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                console_log(instruction);
                instruction = instruction.replace(re, token);
                console_log(instruction);
              }
              if(architecture.instructions[i].fields[a].type == "cop"){
                fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;

                binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (architecture.instructions[i].fields[a].valueField).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
              }
            }

          break;
        }
      }

      if(validTagPC == false && resultPseudo == -3){
        console_log("pendiente");


        pc=pc+(architecture.instructions[i].nwords*4); //PRUEBA



        var padding = "";
        padding = padding.padStart((architecture.instructions[i].nwords*32)-(binary.length), "0");
        binary = binary + padding;

        var hex = bin2hex(binary);
        var auxAddr = address;

        console_log(binary);
        console_log(bin2hex(binary));

        pending_instructions.push({address: address, instruction: instruction, signature: signatureParts, signatureRaw: signatureRawParts, Label: label, binary: binary, startBit: startBit, stopBit: stopBit, visible: true, line: nEnters});

        if(pending == false){
          instructions.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
          instructions_binary.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

          address = address + (4*architecture.instructions[i].nwords);
        }
        else{
          for(var pos = 0; pos < instructions.length; pos++){
            if(parseInt(instructions[pos].Address, 16) > pendingAddress){
              instructions.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
              instructions_binary.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

              auxAddr = pendingAddress;
              break;
            }
          }
        }

        console_log(address.toString(16));
        console_log(instructions);

        stopFor = true;
        break;
      }

      else{
        if(resultPseudo == -3){
          console_log("no pendiente");


          pc=pc+(architecture.instructions[i].nwords*4); //Prueba


          var padding = "";
          padding = padding.padStart((architecture.instructions[i].nwords*32)-(binary.length), "0");

          binary = binary + padding;
          var hex = bin2hex(binary);
          var auxAddr = address;

          console_log(binary);
          console_log(bin2hex(binary));

          if(pending == false){
            instructions.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
            instructions_binary.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

            address = address + (4*architecture.instructions[i].nwords);
          }
          else{
            for(var pos = 0; pos < instructions.length; pos++){
              if(parseInt(instructions[pos].Address, 16) > pendingAddress){
                instructions.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
                instructions_binary.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

                auxAddr = pendingAddress;
                break;
              }
            }
          }

          stopFor = true;

          console_log(address.toString(16));
          console_log(instructions);
        }
      }
    }
  }

  return ret;
}

/*Compile pseudoinstructions*/
function pseudoinstruction_compiler ( instruction, label, line )
{
  var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;

  var re = /\' \'/;
  instruction = instruction.replace(re, "'\0'");
  var re = /\'\\n\'/;
  instruction = instruction.replace(re, "10");
  console_log(instruction);
  var re = /\'\\t\'/;
  instruction = instruction.replace(re, "9");
  console_log(instruction);

  var instructionParts = instruction.split(' ');
  var found = false;

  var re = /\'\0\'/;
  instruction = instruction.replace(re, "' '");
  console_log(instruction);


  for (var i = 0; i < instructionParts.length; i++) {
    instructionParts[i] = instructionParts[i].replace(re, "' '");
  }

  console_log(instructionParts);

  var auxSignature;

  for (var i = 0; i < architecture.pseudoinstructions.length; i++){
    console_log(architecture.pseudoinstructions[i].name);
    if(architecture.pseudoinstructions[i].name != instructionParts[0]){
      continue;
    }

    else{
      found = true;

      var signatureDef = architecture.pseudoinstructions[i].signature_definition;
      signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      re = new RegExp("[fF][0-9]+", "g");
      signatureDef = signatureDef.replace(re, "(.*?)");


      var signatureParts = architecture.pseudoinstructions[i].signature.split(',');
      var signatureRawParts = architecture.pseudoinstructions[i].signatureRaw.split(' ');
      var definition = architecture.pseudoinstructions[i].definition;

      auxSignature = architecture.pseudoinstructions[i].signatureRaw;

      console_log(signatureDef);
      console_log(instruction);
      console_log(instructionParts);

      if(instructionParts.length < (architecture.pseudoinstructions[i].fields.length + 1)){
        for (var j = 0; j < ((architecture.pseudoinstructions[i].fields.length + 1)-instructionParts.length ); j++){
          next_token();
          token = get_token();

          console_log("token: " + token);

          if(token != null){
            var re = new RegExp(",+$");
            token = token.replace(re, "");
          }

          instruction = instruction + " " + token;
        }

        instructionParts = instruction.split(' ');
      }

      console_log(instruction);

      re = new RegExp(signatureDef+"$");
      console_log(re)
      if (instruction.search(re) == -1 && i == architecture.pseudoinstructions.length-1) {
          return packCompileError('m3', auxSignature, 'error', "danger") ;
      }

      if(instruction.search(re) == -1 && i < architecture.pseudoinstructions.length-1){
        found = false;
      }

      if(found == true){
        re = /aliasDouble\((.*)\)/;
        for(var a = 0; a < architecture.pseudoinstructions[i].fields.length && definition.search(re) != -1; a++){
          re = new RegExp(architecture.pseudoinstructions[i].fields[a].name,"g");
          console_log(instructionParts[a+1]);
          instructionParts[a+1] = instructionParts[a+1].replace("$","");
          definition = definition.replace(re, instructionParts[a+1]);
        }

        /*Replace DFP of SPF*/
        re = /aliasDouble\((.*)\)/;
        console_log(re);
        while (definition.search(re) != -1){
          var match = re.exec(definition);
          var args = match[1].split(";");
          var aux = "";

          for(var b = 0; b < architecture.components[3].elements.length; b++){
            console_log(architecture.components[3].elements[b].name);
            if(architecture.components[3].elements[b].name.includes(args[0]) != false){
              aux = architecture.components[3].elements[b].simple_reg[args[1]];
              console_log(aux);
              break;
            }
          }
          console_log(aux);

          definition = definition.replace(re, aux);
          console_log(definition);

        }

        for (var j = 1; j < signatureRawParts.length; j++){
          var aux = signatureRawParts[j].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          re = new RegExp(aux,"g");
          definition = definition.replace(re, instructionParts[j]);
        }

        re = new RegExp("\n","g");
        definition = definition.replace(re, "");

        console_log(definition);
        console_log(signatureParts);

        re = /Field.(\d).\((.*?)\).(.*?)[=<>;\s]/;
        while (definition.search(re) != -1){
          var match = re.exec(definition);
          console_log(match);

          var code;

          if(instructionParts[match[1]].match(/^\'(.*?)\'$/)){
            var re = /^\'(.*?)\'$/;
            console_log(re);
            var match2 = re.exec(instructionParts[match[1]]);
            console_log(match2);
            var asciiCode = match2[1].charCodeAt(0);
            console_log(asciiCode);
            console_log("value = field('" + asciiCode +"', '(" + match[2] + ")', '" + match[3] + "')");
            code = "value = field('" + asciiCode +"', '(" + match[2] + ")', '" + match[3] + "')";
          }
          else{
            console_log("value = field('" + instructionParts[match[1]] +"', '(" + match[2] + ")', '" + match[3] + "')");
            code = "value = field('" + instructionParts[match[1]] +"', '(" + match[2] + ")', '" + match[3] + "')";
          }

          var value;
          try{
            eval(code);
          }
          catch(e){
            if (e instanceof SyntaxError){
              return packCompileError('m5', token, 'error', "danger") ;
            }
          }

          if (value == -1) {
              return packCompileError('m5', token, 'error', "danger") ;
          }

          definition = definition.replace("Field." + match[1] + ".(" + match[2]+ ")." + match[3], value);

          re = /Field.(\d).\((.*?)\).(.*?)[;\s]/;
        }


        re = /Field.(\d).SIZE[=<>;\s]/g;
        if (definition.search(re) != -1){
          var match = re.exec(definition);
          console_log(match);

          var code;

          if(instructionParts[match[1]].match(/^\'(.*?)\'$/)){
            var re = /^\'(.*?)\'$/;
            console_log(re);
            var match2 = re.exec(instructionParts[match[1]]);
            console_log(match2);
            var asciiCode = match2[1].charCodeAt(0);
            console_log(asciiCode);
            console_log("value = field('" + asciiCode +"', 'SIZE', null)");
            code = "value = field('" + asciiCode +"', 'SIZE', null)";
          }
          else{
            console_log("value = field('" + instructionParts[match[1]] +"', 'SIZE', null)");
            code = "value = field('" + instructionParts[match[1]] +"', 'SIZE', null)";
          }

          var value;
          try{
            eval(code);
          }
          catch(e){
            if (e instanceof SyntaxError){
              return packCompileError('m5', token, 'error', "danger") ;
            }
          }

          if(value == -1){
            return packCompileError('m5', token, 'error', "danger") ;
          }

          console_log(value);
          console_log("Field." + match[1] + ".SIZE");

          definition = definition.replace("Field." + match[1] + ".SIZE", value);
        }

        console_log(definition);

        re = /reg\.pc/
        console_log(re);
        while (definition.search(re) != -1){
          definition = definition.replace(re, "pc"); //PRUEBA
          console_log(definition);
        }

        re = /no_ret_op\{([^}]*)\};/;
        console_log(re);
        while (definition.search(re) != -1){
          var match = re.exec(definition);

          console_log(match[1]);

          eval(match[1]);

          definition = definition.replace(re, '');
          console_log(definition);
        }

        re = /op\{([^}]*)\}/;
        console_log(re);
        while (definition.search(re) != -1){
          var match = re.exec(definition);
          var result;

          console_log(match[1]);

          eval("result=" + match[1]);

          definition = definition.replace(re, result);
          console_log(definition);
        }

        while(definition.match(/\'(.*?)\'/)){
          var re = /\'(.*?)\'/;
          console_log(re);
          var match2 = re.exec(instructionParts[match[1]]);
          console_log(match2);
          var asciiCode = match2[1].charCodeAt(0);
          console_log(asciiCode);
          definition = definition.replace(re, asciiCode)
        }

        console_log(definition);

        console_log(instruction);
        var re = new RegExp("'","g");
        instruction = instruction.replace(re, '"');
        console_log(instruction);

        var re = /{([^}]*)}/g;
        var code = re.exec(definition);

        if(code != null){
          while(code != null){
            var instructions = code[1].split(";");
            console_log(instructions);

            for (var j = 0; j < instructions.length-1; j++){
              var aux;
              if(j == 0){
                aux = "ret=instruction_compiler('" + instructions[j] + "','" + instruction + "','" + label + "'," + line + ", false, 0, null, null, true)\nif(ret.status != 'ok'){error = true}";
              }
              else{
                aux = "ret=instruction_compiler('" + instructions[j] + "','', ''," + line + ", false, 0, null, null, true)\nif(ret.status != 'ok'){error = true}";
              }
              definition = definition.replace(instructions[j]+";", aux+";\n");
            }
            code = re.exec(definition);
          }
        }
        else{
          var instructions = definition.split(";");

          for (var j = 0; j < instructions.length-1; j++){
            var aux;
            if(j == 0){
              aux = "ret=instruction_compiler('" + instructions[j] + "','" + instruction + "','" + label + "'," + line + ", false, 0, null, null, true)\nif(ret.status != 'ok'){error = true}";
            }
            else{
              aux = "ret=instruction_compiler('" + instructions[j] + "','', ''," + line + ", false, 0, null, null, true)\nif(ret.status != 'ok'){error = true}";
            }
            definition = definition.replace(instructions[j]+";", aux+";\n");
          }
        }

        try{
          var error = false;
          console_log(definition);
          eval(definition);
          if(error == true){
            console_log("Error pseudo");
            //return packCompileError('m13', "Error pseudoinstruction", 'error', "danger") ;
            return ret;
          }
          console_log("Fin pseudo");
          return ret;
        }
        catch(e){
          if (e instanceof SyntaxError) {
            return packCompileError('m13', "", 'error', "danger") ;
          }
        }
      }

    }
  }

  if (!found) {
      return packCompileError('m3', auxSignature, 'error', "danger") ;
  }

  return ret;
}


/* Get pseudoinstruction fields */
function field ( field, action, type )
{
  console_log(field);
  console_log(action);
  console_log(type);

  if (action == "SIZE")
  {
      console_log("SIZE");

      if (field.match(/^0x/)){
          var value = field.split("x");
          return value[1].length*4;
      }
      else if (field.match(/^([\-\d])+\.(\d)+/)){
          return float2bin(parseFloat(field)).length;
      }
      else if (field.match(/^([\-\d])+/)){
          var numAux = parseInt(field, 10);
          return (bi_intToBigInt(numAux,10).toString(2)).length;
      }
      else
      {
  	  var ret = creator_memory_findbytag(field) ;
  	  if (ret.exit == 1) {
              var numAux = ret.value ;
              return (numAux.toString(2)).length;
	  }
      }
  }

  re = /\((.*?)\)/;
  if (action.search(re) != -1){
    var match = re.exec(action);
    var bits = match[1].split(",");
    var startBit = parseInt(bits[0]);
    var endBit = parseInt(bits[1]);

    if(field.match(/^0x/) && (type == "int" || type == "float")){
      var binNum = (parseInt(field, 16).toString(2));
      binNum = binNum.padStart(32, '0');
      binNum = binNum.substring(31-startBit, 32-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if(field.match(/^0x/) && (type == "double")){
      var binNum = double2bin(hex2double(field));
      binNum = binNum.padStart(64, '0');
      binNum = binNum.substring(63-startBit, 64-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }

    if (Number.isInteger(field) == false)
    {
        var ret = creator_memory_findbytag(field) ;
	if (ret.exit == 1) {
            field = ret.value ;
	}
    }

    if(type == "int"){
      var binNum = (parseInt(field, 10) >>> 0).toString(2);
      binNum = binNum.padStart(32, '0');
      binNum = binNum.substring(31-startBit, 32-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if (type == "float"){
      var binNum = float2bin(parseFloat(field));
      console_log(binNum);
      binNum = binNum.padStart(32, '0');
      binNum = binNum.substring(31-startBit, 32-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if (type == "double"){
      var binNum = double2bin(parseFloat(field));
      console_log(binNum);
      binNum = binNum.padStart(64, '0');
      binNum = binNum.substring(63-startBit, 64-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }

  }
  return -1;
}


/**
 * method in charge of return the length of the value. The most use are whene the field are fragment
 * this funciton is create with the intention of reduce errors on the code in case of add new fragments field
 * @return {int} the size of the field
*/
function getFieldLength(separated, startbit, stopbit,a)
{
    if (startbit == stopbit) console_log("Warning: startbit equal to stopBit, please check the achitecture definitions");
	let fieldsLength;
	if (!separated || !separated[a])
		fieldsLength = startbit - stopbit + 1;
	else
		fieldsLength = startbit
		  .map((b, i) => b - stopbit[i]+1)
		  .reduce((old, newV) => old+newV);
	return fieldsLength;
}

/**
 * method in charge of return the binary instruction after add the inmediate value of the instruction
 * @return {string} the new binary update
*/
function generateBinary(separated, startbit, stopbit, binary, inm,fieldsLenght, a)
{
	if (!separated ||!separated[a])
	    binary = binary.substring(0, binary.length - (startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (stopbit ), binary.length);
	else {
	    // check if the value fit on the first segment
	    let myInm = inm;
	    for (let i = startbit.length-1; i >= 0;  i--) {
		let sb = startbit[i],
		    stb = stopbit[i],
		    diff = sb - stb+1;
		if (myInm.length <= diff) {
		    binary = binary.substring(0, binary.length - (sb+1)) +
			myInm.padStart(diff, "0") +
			binary.substring((binary.length - stb), binary.length);
		    break;
		} else {
		    let tmpinm = inm.substring(myInm.length - diff, myInm.length);
		    binary = binary.substring(0, binary.length - (sb+1)) + tmpinm.padStart(diff, "0") + binary.substring(binary.length - stb, binary.length);
		    myInm = myInm.substring(0,(myInm.length-diff));
		}
	    }
	}
	return binary;
}


function binaryStringToInt( b ) {
    return parseInt(b, 2);
}

