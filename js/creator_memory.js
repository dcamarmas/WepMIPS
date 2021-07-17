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

var word_size_bits  = 32 ;
    // TODO: load from architecture

var word_size_bytes = word_size_bits / 8 ;
    // TODO: load from architecture

var main_memory = [] ;
    //  [
    //    { addr: address, bin: "00", def_bin: "00", tag: null },
    //    ...
    //  ]

var main_memory_datatypes = {} ;
    //  {
    //    { "type": type, "address": addr, "value": value, "default": "00" },
    //  }


/********************
 * Internal API     *
 ********************/

// Address

function main_memory_get_addresses ( )
{
        return Object.keys(main_memory) ;
}

function main_memory_datatype_get_addresses ( )
{
        return Object.keys(main_memory_datatypes) ;
}

// Full value (stored in address)

function main_memory_packs_forav ( addr, value )
{
	return { addr: addr,
                 bin: value, def_bin: "00",
                 reset: true, break: false, tag: null } ;
}

function main_memory_datatypes_packs_foravt ( addr, value, type )
{
        return { "type": type, "address": addr,
                 "value": value, "default": "00" } ;
}

// reset (set to defaults) and clear (remove all values)

function main_memory_reset ( )
{
        var i = 0;

	// reset memory
        var addrs = main_memory_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             main_memory[addrs[i]].bin = main_memory[addrs[i]].def_bin ;
        }

	// reset datatypes
        addrs = main_memory_datatype_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             main_memory_datatypes[addrs[i]].value = main_memory_datatypes[addrs[i]].default ;
        }
}

function main_memory_clear ( )
{
	// reset memory and datatypes
        main_memory = [] ;
        main_memory_datatypes = {} ;
}

//// Read/write (1/3): object level (compilation)

function main_memory_read ( addr )
{
	if (typeof main_memory[addr] !== "undefined") {
	    return main_memory[addr] ;
	}

        return main_memory_packs_forav(addr, '00') ;
}

function main_memory_write ( addr, value )
{
	main_memory[addr] = value ;
}

//// Read/write (2/3): byte level (execution)

function main_memory_read_value ( addr )
{ // main_memory_read_value  ( addr: integer )
	return main_memory_read(addr).bin ;
}

function main_memory_write_value ( addr, value )
{ // main_memory_write_value ( addr: integer,  value: string (hexadecimal) )
        var value_obj = main_memory_read(addr) ;
	value_obj.bin = value ;
	main_memory_write (addr, value_obj) ;
}

function main_memory_write_tag ( addr, tag )
{ // main_memory_write_tag ( addr: integer,  tag: string )
        var value_obj = main_memory_read(addr) ;
	value_obj.tag = tag ;
	main_memory_write (addr, value_obj) ;
}

//// Read/write nbytes

function main_memory_read_nbytes ( addr, n )
{
	var value = "";
	for (var i = 0; i < n; i++) {
	     value = value + main_memory_read_value(addr+i) ;
	}

	return value;
}

function main_memory_write_nbytes ( addr, value, n )
{
        var value_str = value.toString(16).padStart(2*n, "0") ;
	var chunks    = value_str.match(/.{1,2}/g) ;

	for (var i = 0; i < chunks.length; i++) {
	     main_memory_write_value(addr+i, chunks[i]) ;
	}
}

//// Read/write (3/3): DATAtype level (byte, ..., integer, space, ...)

var string_length_limit = 4*1024 ;

function create_memory_read_string ( addr )
{
	var ch = '' ;
	var ret_msg = '' ;

	for (var i=0; i<string_length_limit; i++)
	{
	     ch = main_memory_read_value(addr+i) ;
	     if (ch == '00') {
	         return ret_msg ;
	     }

	     ret_msg += String.fromCharCode(parseInt(ch, 16));
	}

	return ret_msg + '... (string length greater than ' + string_length_limit + ' chars)' ;
}

function main_memory_read_bydatatype ( addr, type )
{
        var ret = 0x0 ;

	switch (type)
        {
		case 'b':
                case 'byte':
		     ret = main_memory_read_value(addr) ;
                     break;

		case 'h':
                case 'half_word':
		     ret = main_memory_read_nbytes(addr, word_size_bytes/2) ;
                     break;

		case 'w':
		case 'integer':
		case 'float':
                case 'word':
		     ret = main_memory_read_nbytes(addr, word_size_bytes) ;
                     break;

		case 'd':
		case 'double':
                case 'double_word':
		     ret = main_memory_read_nbytes(addr, word_size_bytes*2) ;
                     break;

	        case 'asciiz':
		case 'string':
                case 'ascii_null_end':
                     ret = create_memory_read_string(addr) ;
                     break;

	        case 'ascii':
                case 'ascii_not_null_end':
                     // TODO
                     break;

                case 'space':
                     // TODO
                     break;

                case 'instruction':
                     // TODO
                     break;
	}

	return ret ;
}

function main_memory_write_bydatatype ( addr, value, type, value_human )
{
        var ret = 0x0 ;

        // store byte to byte...
	switch (type)
        {
		case 'b':
                case 'byte':
                     var value2 = creator_memory_value_by_type(value, type) ;
		     ret = main_memory_write_nbytes(addr, value2, 1) ;
                     break;

		case 'h':
                case 'half':
                case 'half_word':
                     var value2 = creator_memory_value_by_type(value, type) ;
		     ret = main_memory_write_nbytes(addr, value2, word_size_bytes / 2) ;
                     break;

		case 'w':
		case 'integer':
		case 'float':
                case 'word':
		     ret = main_memory_write_nbytes(addr, value, word_size_bytes) ;
                     break;

		case 'd':
		case 'double':
                case 'double_word':
		     ret = main_memory_write_nbytes(addr, value, word_size_bytes * 2) ;
                     break;

		case 'string':
                case 'ascii_null_end':
	        case 'asciiz':
                case 'ascii_not_null_end':
	        case 'ascii':
	             var ch = 0 ;
		     for (var i=0; i<value.length; i++) {
			  ch = value.charCodeAt(i);
			  main_memory_write_value(addr+i, ch.toString(16)) ;
		     }

                     if ( (type != 'ascii') && (type != 'ascii_not_null_end') ) {
		           main_memory_write_value(addr+value.length, '00') ;
                     }
                     break;

                case 'space':
		     for (var i=0; i<parseInt(value); i++) {
		          main_memory_write_value(addr+i, '00') ;
		     }
                     break;

                case 'instruction':
		     var nb = Math.ceil(value.toString().length / 2) ;
		     ret = main_memory_write_nbytes(addr, value, nb) ;
                     break;
	}

        // datatype
        main_memory_datatypes[addr] = main_memory_datatypes_packs_foravt(addr, value_human, type) ;

	return ret ;
}


/********************
 * Public API       *
 ********************/

// Type, size and address...

function creator_memory_type2size ( type )
{
	var size = 4;

	switch (type)
	{
		case 'b':
		case 'bu':
		case 'byte':
			 size = 1 ;
			 break;

		case 'h':
		case 'hu':
		case 'half':
                case 'half_word':
			 size = word_size_bytes / 2 ;
			 break;

		case 'w':
		case 'wu':
		case 'word':
		case 'float':
		case 'integer':
                case 'instruction':
			 size = word_size_bytes ;
			 break;

		case 'd':
		case 'du':
		case 'double':
                case 'double_word':
			 size = word_size_bytes * 2 ;
			 break;
	}

	return size ;
}

function creator_memory_value_by_type ( val, type )
{
	switch (type)
	{
		case 'b':
		 val = val & 0xFF ;
		 if (val & 0x80)
			 val = 0xFFFFFF00 | val ;
		 break;

		case 'bu':
		 val = ((val << 24) >> 24) ;
		 break;

		case 'h':
		 val = val & 0xFFFF ;
		 if (val & 0x8000)
			 val = 0xFFFF0000 | val ;
		 break;

		case 'hu':
		 val = ((val << 16) >> 16) ;
		 break;

		default:
		 break;
	}

	return val ;
}

function creator_memory_alignelto ( new_addr, new_size )
{
        var ret = {
                    new_addr: new_addr,
                    new_size: new_size
                  } ;

        // get align address and size
        for (var i=0; i<word_size_bytes; i++)
        {
             if (((new_addr + i) % word_size_bytes) == 0) {
                 ret.new_addr = new_addr + i ;
             }
             if (((new_size + i) % word_size_bytes) == 0) {
                 ret.new_size = new_size + i ;
             }
        }

	return ret ;
}

// set default content for main_memory and main_memory_datatype

function creator_memory_prereset ( )
{
        var i = 0;

	// prereset main memory
        var addrs = main_memory_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             main_memory[addrs[i]].def_bin = main_memory[addrs[i]].bin ;
        }

	// prereset datatypes
        addrs = main_memory_datatype_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             main_memory_datatypes[addrs[i]].default = main_memory_datatypes[addrs[i]].value ;
        }
}

// find address by tag

function creator_memory_findaddress_bytag ( tag )
{
        var ret = {
	             exit:  0,
	             value: 0
	          } ;

	// find main memory by tag
        var addrs = main_memory_get_addresses() ;
        for (var i=0; i<addrs.length; i++)
	{
             if (main_memory[addrs[i]].tag == tag)
	     {
	         ret.exit  = 1 ;
	         ret.value = parseInt(addrs[i]) ;
	     }
        }

        return ret ;
}

// for debugging...

function creator_memory_consolelog ( )
{
        var i = 0;

	// show main memory
        console.log(' ~~~ main memory ~~~~~~~~~~~~~~') ;
        var addrs = main_memory_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             console.log(JSON.stringify(main_memory[addrs[i]])) ;
        }

	// show datatypes
        console.log(' ~~~ datatypes ~~~~~~~~~~~~~~') ;
        addrs = main_memory_datatype_get_addresses() ;
        for (i=0; i<addrs.length; i++) {
             console.log(JSON.stringify(main_memory_datatypes[addrs[i]])) ;
        }
}

// memory zerofill and alloc ...

function creator_memory_zerofill ( new_addr, new_size )
{
        // fill memory
	for (var i=0; i<new_size; i++)
        {
             var value = main_memory_packs_forav(new_addr+i, '00') ;
             main_memory_write(new_addr+i, value) ;
	}

        // return initial address used
	return new_addr ;
}

function creator_memory_alloc ( new_size )
{
        // get align address
	var new_addr = architecture.memory_layout[3].value + 1 ;
        var algn = creator_memory_alignelto(new_addr, new_size) ;

        // fill memory
        creator_memory_zerofill(algn.new_addr, algn.new_size) ;

        // new segment limit
	architecture.memory_layout[3].value = algn.new_addr + algn.new_size ;
	if (typeof app !== "undefined") {
	    app.architecture.memory_layout[3].value = algn.new_addr + algn.new_size ;
	}

	return algn.new_addr ;
}

function main_memory_storedata ( data_address, value, size, dataLabel, value_human, DefValue, type )
{
        var algn = creator_memory_alignelto(data_address, size) ;

        main_memory_write_bydatatype(algn.new_addr, value, type, value_human) ;
        creator_memory_zerofill((algn.new_addr + size), (algn.new_size - size)) ;

        if (dataLabel != '') {
            main_memory_write_tag(algn.new_addr, dataLabel) ;
        }

        return data_address = data_address + algn.new_size ;
}

// update an app._data.main_memory row:
// "000": {addr: 2003, addr_begin: "0x200", addr_end: "0x2003", hex:[{byte: "1A", tag: "main"},...], value: "1000", eye: true},

function creator_memory_updaterow ( addr )
{
    // skip if app.data does not exit...
    if ((typeof app == "undefined") || (typeof app._data.main_memory == "undefined") ) {
        return ;
    }

    // base address
    var addr_base = parseInt(addr) ;
        addr_base = addr_base - (addr_base % word_size_bytes) ; // get word aligned address

    // get_or_create...
    var elto = {} ;
    if (typeof app._data.main_memory[addr_base] != "undefined")
    { // reuse the existing element...
        elto = app._data.main_memory[addr_base] ;
    }
    else
    { // set a new element, and set the initial values...
        // app._data.main_memory[addr_base] = elto ;
        Vue.set(app._data.main_memory, addr_base, elto) ;

        elto.hex = [] ;
        for (var i=0; i<word_size_bytes; i++) {
             elto.hex[i] = { byte: "00", tag: null } ;
        }
    }

    // addr_begin
    elto.addr_begin = "0x" + addr_base.toString(16).padStart(word_size_bytes * 2, "0").toUpperCase() ;

    // addr_end
    var addr_end = addr_base + word_size_bytes - 1 ;
    elto.addr_end = "0x" + addr_end.toString(16).padStart(word_size_bytes * 2, "0").toUpperCase() ;

    // addr
    elto.addr = addr_end ;

    // hex
    var v1 = {} ;
    for (var i=0; i<word_size_bytes; i++)
    {
         v1 = main_memory_read(addr_base + i) ;
         elto.hex[i].byte = v1.bin;
         elto.hex[i].tag  = v1.tag;

         if (v1.tag == "") {
             elto.hex[i].tag  = null;
         }
    }

    // value
    elto.value = '' ;
    if (typeof main_memory_datatypes[addr_base] != "undefined") {
        elto.value = main_memory_datatypes[addr_base].value ;
    }

    // eye
    elto.eye = false ;
    if (typeof main_memory_datatypes[addr_base] != "undefined") {
        if (main_memory_datatypes[addr_base].type == "space") {
            elto.eye = true ;
        }
    }
}

function creator_memory_updateall ( )
{
    // skip if app.data does not exit...
    if ((typeof app == "undefined") || (typeof app._data.main_memory == "undefined") ) {
        return ;
    }

    // update all rows in app._data.main_memory...
    var addrs = main_memory_get_addresses() ;

    var last_addr = -1;
    var curr_addr = -1;
    for (var i=0; i<addrs.length; i++)
    {
	curr_addr = parseInt(addrs[i]) ;
	if (Math.abs(curr_addr - last_addr) > 3)
	{
            creator_memory_updaterow(addrs[i]);
	    last_addr = curr_addr ;
	}
    }
}

function creator_memory_clearall ( )
{
    // skip if app.data does not exit...
    if ((typeof app == "undefined") || (typeof app._data.main_memory == "undefined") ) {
        return ;
    }

    // clear all
    app._data.main_memory = {} ;
}


/**********************************************
 *
 *  OLD Memory operations
 *
 **********************************************/

var memory_hash     = [ "data_memory", "instructions_memory", "stack_memory" ] ;
var memory          = { data_memory: [], instructions_memory: [], stack_memory: [] } ;


/* Write value in memory */
function writeMemory ( value, addr, type )
{
        // NEW
        main_memory_write_bydatatype(addr, value, type, value) ;
        creator_memory_updaterow(addr);
        // return ; // FUTURE

        // OLD
	var draw = {
		space: [] ,
		info: [] ,
		success: [] ,
		danger: [],
		flash: []
	} ;

	if (value == null) {
		return;
	}

	var memValue = (value.toString(16)).padStart(8, "0");
	var index;

	if (type == "w"){
		if((addr > architecture.memory_layout[0].value && addr < architecture.memory_layout[1].value) ||  addr == architecture.memory_layout[0].value || addr == architecture.memory_layout[1].value){
			draw.danger.push(executionIndex);
			executionIndex = -1;
			throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
		}

		if((addr > architecture.memory_layout[2].value && addr < architecture.memory_layout[3].value) ||  addr == architecture.memory_layout[2].value || addr == architecture.memory_layout[3].value){
			index = memory_hash[0];
		}

		if((addr > architecture.memory_layout[4].value && addr < architecture.memory_layout[5].value) ||  addr == architecture.memory_layout[4].value || addr == architecture.memory_layout[5].value){
			index = memory_hash[2];
		}

		for (var i = 0; i < memory[index].length; i++)
                {
			for (var j = 0; j < memory[index][i].Binary.length; j++)
                        {
				var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
				if (aux == addr || memory[index][i].Binary[j].Tag == addr)
                                {
					//memory[index][i].Value = parseInt(memValue, 16);
					if (memory[index][i].type == "float") {
						memory[index][i].Value = hex2float("0x" + memValue);
					}
					else {
						memory[index][i].Value = (parseInt(memValue, 16) >> 0);
					}

					var charIndex = memValue.length-1;
					for (var z = 0; z < memory[index][i].Binary.length; z++){
						memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
						charIndex = charIndex - 2;
					}
					//memory[index][i].Value = parseInt(memValue, 16);

					if (memory[index][i].type == "float") {
						memory[index][i].Value = hex2float("0x" + memValue);
					}
					else {
						memory[index][i].Value = (parseInt(memValue, 16) >> 0);
					}

					if (typeof app !== "undefined")
							app._data.memory[index] = memory[index];
					return;
				}
			}
		}

		for (var i = 0; i < memory[index].length; i++)
                {
			if (memory[index][i].Address > addr)
                        {
				var aux_addr = addr - (addr%4);
				memory[index].splice(i, 0, {Address: aux_addr, Binary: [], Value: (parseInt(memValue, 16) >> 0), DefValue: null, reset: false});
				var charIndex = memValue.length-1;
				for (var z = 0; z < 4; z++){
					(memory[index][i].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase(), Tag: null},);
					charIndex = charIndex - 2;
				}
				if (typeof app !== "undefined")
					app._data.memory[index] = memory[index];
				return;
			}
			else if(i == memory[index].length-1){
				var aux_addr = addr - (addr%4);
				memory[index].push({Address: aux_addr, Binary: [], Value: (parseInt(memValue, 16) >> 0), DefValue: null, reset: false});
				var charIndex = memValue.length-1;
				for (var z = 0; z < 4; z++){
					(memory[index][i+1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase(), Tag: null},);
					charIndex = charIndex - 2;
				}
				if (typeof app !== "undefined")
						app._data.memory[index] = memory[index];
				return;
			}
		}

		if(memory[index].length == 0){
			var aux_addr = addr - (addr%4);
			memory[index].push({Address: aux_addr, Binary: [], Value: (parseInt(memValue, 16) >> 0), DefValue: null, reset: false});
			var charIndex = memValue.length-1;
			for (var z = 0; z < 4; z++){
				(memory[index][memory[index].length-1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase(), Tag: null},);
				charIndex = charIndex - 2;
			}
			if (typeof app !== "undefined")
					app._data.memory[index] = memory[index];
			return;
		}
	}

	if (type == "h"){
		if((addr > architecture.memory_layout[0].value && addr < architecture.memory_layout[1].value) ||  addr == architecture.memory_layout[0].value || addr == architecture.memory_layout[1].value){
draw.danger.push(executionIndex);
			executionIndex = -1;
			throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
		}

		if((addr > architecture.memory_layout[2].value && addr < architecture.memory_layout[3].value) ||  addr == architecture.memory_layout[2].value || addr == architecture.memory_layout[3].value){
			index = memory_hash[0];
		}

		if((addr > architecture.memory_layout[4].value && addr < architecture.memory_layout[5].value) ||  addr == architecture.memory_layout[4].value || addr == architecture.memory_layout[5].value){
			index = memory_hash[2];
		}

		for (var i = 0; i < memory[index].length; i++){
			for (var j = 0; j < memory[index][i].Binary.length; j++){
				var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
				if(aux == addr || memory[index][i].Binary[j].Tag == addr){
					 if(j < 2){
						var charIndex = memValue.length-1;
						for (var z = 0; z < memory[index][i].Binary.length - 2; z++){
							memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
							charIndex = charIndex - 2;
						}

						memory[index][i].Value = null;
						for (var z=3; (z<4) && (z>=0); z=z-2){
							memory[index][i].Value = memory[index][i].Value + (parseInt((memory[index][i].Binary[z].Bin + memory[index][i].Binary[z-1].Bin), 16) >> 0) + " ";
						}
						if (typeof app !== "undefined")
								app._data.memory[index] = memory[index];
						return;
					}
					else{
						var charIndex = memValue.length-1;
						for (var z = 2; z < memory[index][i].Binary.length; z++){
							memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
							charIndex = charIndex - 2;
						}
						if (typeof app !== "undefined")
								app._data.memory[index] = memory[index];
						return;
					}
				}
			}
		}

		for (var i = 0; i < memory[index].length; i++){
			if(memory[index][i].Address > addr){
				var aux_addr = addr - (addr%4);
				memory[index].splice(i, 0, {Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
				var charIndex = memValue.length-1;
				for (var z = 0; z < 4; z++){
					(memory[index][i].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
				}
				for (var j = 0; j < memory[index][i].Binary.length; j++){
					var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
					if(aux == addr || memory[index][i].Binary[j].Tag == addr){
						 if(j < 2){
							var charIndex = memValue.length-1;
							for (var z = 0; z < memory[index][i].Binary.length - 2; z++){
								memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
								charIndex = charIndex - 2;
							}
							memory[index][i].Value = "0 " + (parseInt(memValue, 16) >> 0);
							if (typeof app !== "undefined")
									app._data.memory[index] = memory[index];
							return;
						}
						else{
							var charIndex = memValue.length-1;
							for (var z = 2; z < memory[index][i].Binary.length; z++){
								memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
								charIndex = charIndex - 2;
							}
							memory[index][i].Value = (parseInt(memValue, 16) >> 0) + " 0";
							if (typeof app !== "undefined")
									app._data.memory[index] = memory[index];
							return;
						}
					}
				}
				return;
			}
			else if(i == memory[index].length-1){
				var aux_addr = addr - (addr%4);
				memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
				var charIndex = memValue.length-1;
				for (var z = 0; z < 4; z++){
					(memory[index][i+1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
				}
				for (var j = 0; j < memory[index][i+1].Binary.length; j++){
					var aux = "0x"+(memory[index][i+1].Binary[j].Addr).toString(16);
					if(aux == addr || memory[index][i+1].Binary[j].Tag == addr){
						 if(j < 2){
							var charIndex = memValue.length-1;
							for (var z = 0; z < memory[index][i+1].Binary.length - 2; z++){
								memory[index][i+1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
								charIndex = charIndex - 2;
							}
							memory[index][i+1].Value = "0 " + (parseInt(memValue, 16) >> 0);
							if (typeof app !== "undefined")
									app._data.memory[index] = memory[index];
							return;
						}
						else{
							var charIndex = memValue.length-1;
							for (var z = 2; z < memory[index][i].Binary.length; z++){
								memory[index][i+1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
								charIndex = charIndex - 2;
							}
							memory[index][i+1].Value = parseInt(memValue, 16) + " 0";
							if (typeof app !== "undefined")
									app._data.memory[index] = memory[index];
							return;
						}
					}
				}
				return;
			}
		}

		if(memory[index].length == 0){
			var aux_addr = addr - (addr%4);
			memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
			var charIndex = memValue.length-1;
			for (var z = 0; z < 4; z++){
				(memory[index][memory[index].length-1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
			}
			for (var j = 0; j < memory[index][memory[index].length-1].Binary.length; j++){
				var aux = "0x"+(memory[index][memory[index].length-1].Binary[j].Addr).toString(16);
				if(aux == addr || memory[index][memory[index].length-1].Binary[j].Tag == addr){
					 if(j < 2){
						var charIndex = memValue.length-1;
						for (var z = 0; z < memory[index][memory[index].length-1].Binary.length - 2; z++){
							memory[index][memory[index].length-1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
							charIndex = charIndex - 2;
						}
						memory[index][memory[index].length-1].Value = "0 " + (parseInt(memValue, 16) >> 0);
						if (typeof app !== "undefined")
								app._data.memory[index] = memory[index];
						return;
					}
					else{
						var charIndex = memValue.length-1;
						for (var z = 2; z < memory[index][i].Binary.length; z++){
							memory[index][memory[index].length-1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
							charIndex = charIndex - 2;
						}
						memory[index][memory[index].length-1].Value = (parseInt(memValue, 16) >> 0) + " 0";
						if (typeof app !== "undefined")
								app._data.memory[index] = memory[index];
						return;
					}
				}
			}
			return;
		}
	}

	if (type == "b"){
		if((addr > architecture.memory_layout[0].value && addr < architecture.memory_layout[1].value) ||  addr == architecture.memory_layout[0].value || addr == architecture.memory_layout[1].value){
draw.danger.push(executionIndex);
			executionIndex = -1;
			throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
		}

		if((addr > architecture.memory_layout[2].value && addr < architecture.memory_layout[3].value) ||  addr == architecture.memory_layout[2].value || addr == architecture.memory_layout[3].value){
			index = memory_hash[0];
		}

		if((addr > architecture.memory_layout[4].value && addr < architecture.memory_layout[5].value) ||  addr == architecture.memory_layout[4].value || addr == architecture.memory_layout[5].value){
			index = memory_hash[2];
		}

		for (var i = 0; i < memory[index].length; i++){
			for (var j = 0; j < memory[index][i].Binary.length; j++){
				var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
				if(aux == addr || memory[index][i].Binary[j].Tag == addr){
					var charIndex = memValue.length-1;
					memory[index][i].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
					memory[index][i].Value = null;
					for (var z=3; (z<4) && (z>=0); z--){
						memory[index][i].Value = memory[index][i].Value + parseInt(memory[index][i].Binary[z].Bin, 16) + " ";
					}
					return;
				}
			}
		}

		for (var i = 0; i < memory[index].length; i++){
			if(memory[index][i].Address > addr){
				var aux_addr = addr - (addr%4);
				memory[index].splice(i, 0, {Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
				var charIndex = memValue.length-1;
				for (var z = 0; z < 4; z++){
					(memory[index][i].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
				}
				for (var j = 0; j < memory[index][i].Binary.length; j++){
					var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
					if(aux == addr || memory[index][i].Binary[j].Tag == addr){
						var charIndex = memValue.length-1;
						memory[index][i].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
						for (var z = 3; z < 4; z--){
							memory[index][i+1].Value = memory[index][i+1].Value + parseInt(memory[index][i+1].Binary[z].Bin, 16) + " ";
						}
						return;
					}
				}
				return;
			}
			else if(i == memory[index].length-1){
				var aux_addr = addr - (addr%4);
				memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
				var charIndex = memValue.length-1;
				for (var z = 0; z < 4; z++){
					(memory[index][i+1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
				}
				for (var j = 0; j < memory[index][i+1].Binary.length; j++){
					var aux = "0x"+(memory[index][i+1].Binary[j].Addr).toString(16);
					if(aux == addr || memory[index][i+1].Binary[j].Tag == addr){
						var charIndex = memValue.length-1;
						memory[index][i+1].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
						for (var z = 3; z < 4; z--){
							memory[index][i+1].Value = memory[index][i+1].Value + parseInt(memory[index][i+1].Binary[z].Bin, 16) + " ";
						}
						return;
					}
				}
				return;
			}
		}

		if(memory[index].length == 0){
			var aux_addr = addr - (addr%4);
			memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
			var charIndex = memValue.length-1;
			for (var z = 0; z < 4; z++){
				(memory[index][memory[index].length-1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
			}
			for (var j = 0; j < memory[index][memory[index].length-1].Binary.length; j++){
				var aux = "0x"+(memory[index][memory[index].length-1].Binary[j].Addr).toString(16);
				if(aux == addr || memory[index][memory[index].length-1].Binary[j].Tag == addr){
					var charIndex = memValue.length-1;
					memory[index][memory[index].length-1].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
					for (var z = 3; z < 4; z--){
						memory[index][memory[index].length-1].Value = memory[index][memory[index].length-1].Value + parseInt(memory[index][memory[index].length-1].Binary[z].Bin, 16) + " ";
					}
					return;
				}
			}
			return;
		}
	}
}

// readMemory
function readMemory ( addr, type )
{
        // NEW
        // return main_memory_read_bydatatype(addr, type) ; // FUTURE
        main_memory_read_bydatatype(addr, type) ;

        // OLD
	var memValue = '';
	var index;

	var draw = {
		space: [] ,
		info: [] ,
		success: [] ,
		danger: [],
		flash: []
	} ;


	if (type == "d") {
				// debugger;
				if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
					draw.danger.push(executionIndex);
					executionIndex = -1;
					throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
				}
				if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value) index = memory_hash[0];

				if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value) index = memory_hash[2];

				for (var i = 0; i < memory[index].length; i++){
					for (var j = 0; j < memory[index][i].Binary.length; j++){
						var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
						if(aux == addr || memory[index][i].Binary[j].Tag == addr){
	for (let k = 0; k<2; k++)
		for (var z = 0; z < memory[index][i].Binary.length; z++)
				memValue = memory[index][k].Binary[z].Bin + memValue;
							//return bi_intToBigInt(memValue, 16) ;
	return parseInt(memValue, 16);
						}
					}
				}
return 0;
	}

				if (type == "w"){
					if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
			draw.danger.push(executionIndex);
						executionIndex = -1;
						throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
					}

					if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
						index = memory_hash[0];
					}

					if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
						index = memory_hash[2];
					}

					for (var i = 0; i < memory[index].length; i++){
						for (var j = 0; j < memory[index][i].Binary.length; j++){
							var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
							if(aux == addr || memory[index][i].Binary[j].Tag == addr){
								for (var z = 0; z < memory[index][i].Binary.length; z++){
									memValue = memory[index][i].Binary[z].Bin + memValue;
								}
								//return bi_intToBigInt(memValue, 16) ;
								return parseInt(memValue,16);
							}
						}
					}
					//return bi_intToBigInt(0,10) ;
					return 0;
				}

				if (type == "h"){
					if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
			draw.danger.push(executionIndex);
						executionIndex = -1;
						throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
					}

					if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
						index = memory_hash[0];
					}

					if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
						index = memory_hash[2];
					}

					for (var i = 0; i < memory[index].length; i++){
						for (var j = 0; j < memory[index][i].Binary.length; j++){
							var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
							if(aux == addr || memory[index][i].Binary[j].Tag == addr){
								if(j < 2){
									for (var z = 0; z < memory[index][i].Binary.length -2; z++){
										memValue = memory[index][i].Binary[z].Bin + memValue;
									}
									//return bi_intToBigInt(memValue, 16) ;
									return parseInt(memValue,16);
								}
								else{
									for (var z = 2; z < memory[index][i].Binary.length; z++){
										memValue = memory[index][i].Binary[z].Bin + memValue;
									}
									//return bi_intToBigInt(memValue, 16) ;
									return parseInt(memValue,16);
								}
							}
						}
					}
					//return bi_intToBigInt(0,10) ;
					return 0;
				}

				if (type == "b"){
					if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
			draw.danger.push(executionIndex);
						executionIndex = -1;
						throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
					}

					if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
						index = memory_hash[0];
					}

					if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
						index = memory_hash[2];
					}

					for (var i = 0; i < memory[index].length; i++){
						for (var j = 0; j < memory[index][i].Binary.length; j++){
							var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
							if(aux == addr || memory[index][i].Binary[j].Tag == addr){
								memValue = memory[index][i].Binary[j].Bin + memValue;
								//return bi_intToBigInt(memValue, 16) ;
								return parseInt(memValue,16);
							}
						}
					}
					//return bi_intToBigInt(0,10) ;
					return 0;
				}
}

function memory_reset ( )
{
        // NEW
        main_memory_reset() ;
        creator_memory_updateall() ;
        // return ; // FUTURE

        // OLD
	for (var i = 0; i < memory[memory_hash[0]].length; i++)
	{
		if (memory[memory_hash[0]][i].reset == true)
		{
			memory[memory_hash[0]].splice(i, 1);
			i--;
		}
		else {
			memory[memory_hash[0]][i].Value = memory[memory_hash[0]][i].DefValue;
			for (var j = 0; j < memory[memory_hash[0]][i].Binary.length; j++) {
				memory[memory_hash[0]][i].Binary[j].Bin = memory[memory_hash[0]][i].Binary[j].DefBin;
			}
		}
	}

	for (var i = 0; i < memory[memory_hash[2]].length; i++)
	{
		if (memory[memory_hash[2]][i].reset == true) {
			memory[memory_hash[2]].splice(i, 1);
			i--;
		}
		else{
			memory[memory_hash[2]][i].Value = memory[memory_hash[2]][i].DefValue;
			for (var j = 0; j < memory[memory_hash[2]][i].Binary.length; j++) {
				memory[memory_hash[2]][i].Binary[j].Bin = memory[memory_hash[2]][i].Binary[j].DefBin;
			}
		}
	}
}


function crex_sbrk ( new_size )
{
        // NEW
        //var new_addr = creator_memory_alloc(new_size) ; // FUTURE
 	//return packExecute(false, '', 'danger', new_addr) ; // FUTURE
        creator_memory_alloc(new_size) ;

        // OLD
	var new_addr = 0 ;
	var aux_addr = architecture.memory_layout[3].value + word_size_bytes ;

	if ((architecture.memory_layout[3].value + new_size) >= architecture.memory_layout[4].value)
	{
		executionIndex = -1 ;
		return packExecute(true, 'Not enough memory for data segment', 'danger', null) ;
	}

	for (var i = 0; i < (new_size / 4); i++)
	{
		memory[memory_hash[0]].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: true}) ;

		if (i == 0) {
			new_addr = aux_addr ;
		}

		for (var z = 0; z < 4; z++) {
			 (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: aux_addr, DefBin: "00", Bin: "00", Tag: null},) ;
			 aux_addr++ ;
		}
	}

	if (typeof app !== "undefined") {
		app._data.memory[memory_hash[0]] = memory[memory_hash[0]] ;
	}

	architecture.memory_layout[3].value = aux_addr-1 ;

	if (typeof app !== "undefined") {
		app.architecture.memory_layout[3].value = aux_addr-1 ;
	}

        for (var i=0; i<word_size_bytes; i++)
        {
             new_addr = new_addr + i ;
             if (new_addr % word_size_bytes == 0) {
                 break ;
             }
        }

	return packExecute(false, '', 'danger', new_addr) ;
}

function crex_get_string_from_memory ( addr )
{
        // NEW
        //var ret_msg = main_memory_read_bydatatype(parseInt(addr), "string") ; // FUTURE
 	//return packExecute(false, 'printed', 'info', ret_msg) ; // FUTURE
        main_memory_read_bydatatype(parseInt(addr), "string") ;

        // OLD
	 var index   = 0 ;
	 var ret_msg = '' ;

	 if ((parseInt(addr) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr) == architecture.memory_layout[0].value || parseInt(addr) == architecture.memory_layout[1].value)
	 {
		 executionIndex = -1;
		 if (typeof app !== "undefined") {
			 app._data.keyboard = "";
		 }

		 return packExecute(true, 'Segmentation fault. You tried to write in the text segment', 'danger', null);
	 }

	 if ((parseInt(addr) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr) == architecture.memory_layout[2].value || parseInt(addr) == architecture.memory_layout[3].value){
		 index = memory_hash[0];
	 }

	 if ((parseInt(addr) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr) == architecture.memory_layout[4].value || parseInt(addr) == architecture.memory_layout[5].value){
		 index = memory_hash[2];
	 }

	for (var i = 0; i < memory[index].length; i++)
		{
		for (var j = 0; j < memory[index][i].Binary.length; j++)
				{
			var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
			if (aux == addr)
						{
				for (var i; i < memory[index].length; i++)
								{
					for (var k = j; k < memory[index][i].Binary.length; k++)
					{
						console_log(parseInt(memory[index][i].Binary[k].Bin, 16));
						console_log(String.fromCharCode(parseInt(memory[index][i].Binary[k].Bin, 16)));

						if (memory[index][i].Binary[k].Bin == "00") {
							return packExecute(false, 'printed', 'info', ret_msg);
						}

						ret_msg += String.fromCharCode(parseInt(memory[index][i].Binary[k].Bin, 16));

						if (i == memory[index].length-1 && k == memory[index][i].Binary.length-1) {
							return packExecute(false, 'printed', 'info', ret_msg);
						}

						j=0;
					}
				}
			}
		}
	}
}

function crex_read_string_into_memory ( keystroke, value, addr, valueIndex, auxAddr )
{
        // NEW
        // return main_memory_write_bydatatype(parseInt(addr), keystroke, "string", keystroke) ; // FUTURE
        main_memory_write_bydatatype(parseInt(addr), keystroke, "string", keystroke) ;

        // OLD
	var ret = {
		errorcode: "",
		token: "",
		type: "",
		update: "",
		status: "ok"
	} ;

	var index ;

	if((parseInt(addr) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr) == architecture.memory_layout[0].value || parseInt(addr) == architecture.memory_layout[1].value){
		executionIndex = -1;
		if (typeof app !== "undefined")
				app.keyboard = "";
		return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
	}

	if((parseInt(addr) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr) == architecture.memory_layout[2].value || parseInt(addr) == architecture.memory_layout[3].value){
		index = memory_hash[0];
	}

	if((parseInt(addr) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr) == architecture.memory_layout[4].value || parseInt(addr) == architecture.memory_layout[5].value){
		index = memory_hash[2];
	}

	for (var i = 0; i < memory[index].length && keystroke.length > 0; i++){
		for (var j = 0; j < memory[index][i].Binary.length; j++){
			var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
			if(aux == addr){
				for (var j = j; j < memory[index][i].Binary.length && valueIndex < value.length; j++){
					memory[index][i].Binary[j].Bin = (value.charCodeAt(valueIndex)).toString(16);
					auxAddr = memory[index][i].Binary[j].Addr;
					valueIndex++;
					addr++;
				}

				memory[index][i].Value = "";
				for (var j = 0; j < memory[index][i].Binary.length; j++){
					memory[index][i].Value = String.fromCharCode(parseInt(memory[index][i].Binary[j].Bin, 16)) + " " + memory[index][i].Value;
				}

				if((i+1) < memory[index].length && valueIndex < value.length){
					i++;
					for (var j = 0; j < memory[index][i].Binary.length && valueIndex < value.length; j++){
						memory[index][i].Binary[j].Bin = (value.charCodeAt(valueIndex)).toString(16);
						auxAddr = memory[index][i].Binary[j].Addr;
						valueIndex++;
						addr++;
					}

					memory[index][i].Value = "";
					for (var j = 0; j < memory[index][i].Binary.length; j++){
						memory[index][i].Value = String.fromCharCode(parseInt(memory[index][i].Binary[j].Bin, 16)) + " " + memory[index][i].Value;
					}

				}
				else if(valueIndex < value.length){
					data_address = auxAddr;
					memory[index].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false});
					i++;
					for (var z = 0; z < 4; z++){
						if(valueIndex < value.length){
							(memory[index][i].Binary).push({Addr: data_address, DefBin: (value.charCodeAt(valueIndex)).toString(16), Bin: (value.charCodeAt(valueIndex)).toString(16), Tag: null},);
							valueIndex++;
							data_address++;
						}
						else{
							(memory[index][i].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
							data_address++;
						}
					}

					memory[index][i].Value = "";
					for (var j = 0; j < memory[index][i].Binary.length; j++){
						memory[index][i].Value = String.fromCharCode(parseInt(memory[index][i].Binary[j].Bin, 16)) + " " + memory[index][i].Value;
					}
				}
			}
		}
	}

	if (valueIndex == value.length)
	{
		 if (typeof app !== "undefined")
				 app.keyboard = "";

		 consoleMutex = false;
		 mutexRead = false;

		 if (typeof app !== "undefined")
			 app._data.enter = null;

		if (window.document)
					show_notification('The data has been uploaded', 'info') ;

		if (executionIndex >= instructions.length)
		{
				for (var i = 0; i < instructions.length; i++) {
						 draw.space.push(i) ;
				}
				executionIndex = -2;
				return packExecute(true, 'The execution of the program has finished', 'success', null);
		}
		else if (runProgram == false){
						 if (typeof app !== "undefined")
								 app.executeProgram();
		}

		return ret;
	}

	var auxAddr = parseInt(addr);

	while (valueIndex < value.length)
	{
		memory[index].push({Address: auxAddr, Binary: [], Value: "", DefValue: "", reset: false});
		for (var z = 0; z < 4; z++)
		{
			if (valueIndex > value.length-1){
				(memory[index][i].Binary).push({Addr: auxAddr, DefBin: "00", Bin: "00", Tag: null},);
			}
			else {
				(memory[index][i].Binary).push({Addr: auxAddr, DefBin: "00", Bin: (value.charCodeAt(valueIndex)).toString(16), Tag: null},);
				memory[index][i].Value = value.charAt(valueIndex) + " " + memory[index][i].Value;
			}
			auxAddr++;
			valueIndex++;
		}
		i++;
	}

	return ret;
}

function crex_memory_clear ( )
{
        // NEW
        main_memory_clear() ;
        creator_memory_clearall() ;
        // return ; // FUTURE

        // OLD
        memory[memory_hash[0]] = [];
        memory[memory_hash[1]] = [];
        memory[memory_hash[2]] = [];
}

function crex_memory_data_compiler ( value, size, dataLabel, DefValue, type )
{
        // NEW
        //main_memory_storedata(data_address, value, size, dataLabel, DefValue, DefValue, type) ; // FUTURE
        //return '' ; // FUTURE
        main_memory_storedata(data_address, value, size, dataLabel, DefValue, DefValue, type) ;

        // OLD
        for (var i = 0; i < (value.length/2); i++)
	{
          if ((data_address % align) != 0 && i == 0 && align != 0)
	  {
            while((data_address % align) != 0)
            {
              if(data_address % 4 == 0){
                memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false, type: type});
                (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                data_address++;
              }
              else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4){
                data_address++;
              }
              else{
                (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                data_address++;
              }
            }
          }

          if (data_address % size != 0 && i == 0) {
              return 'm21' ;
          }

          if(data_address % 4 == 0){
            console_log(DefValue);
            memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: DefValue, DefValue: DefValue, reset: false, type: type});

            if(i == 0){
              (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: dataLabel},);
              if(dataLabel != null){
                data_tag.push({tag: dataLabel, addr: data_address});
              }
              dataLabel = null;
            }
            else{
              (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: null},);
            }

            data_address++;
          }
          else{
            if(value.length <= 4 && i == 0){
              console_log(DefValue);
              memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = DefValue + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
              memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = DefValue + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
            }

            if(i == 0){
              (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: dataLabel},);
              if(dataLabel != null){
                data_tag.push({tag: dataLabel, addr: data_address});
              }
              dataLabel = null;
            }
            else{
              (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: null},);
              console_log(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary[data_address%4]);
            }
            data_address++;
          }
        }

        if (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4)
        {
          var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
          for(var i = 0; i < num_iter; i++){
            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + i), DefBin: "00", Bin: "00", Tag: null},);
          }
        }

        return '' ;
}

function creator_memory_findbytag ( tag )
{
        // NEW
        // return creator_memory_findaddress_bytag(tag) ;  // FUTURE
        creator_memory_findaddress_bytag(tag) ;

        // OLD
        var ret = {
	             exit: 0,
	             value: 0
	          } ;

        // Search tag in data segment
        for (var z = 0; z < memory[memory_hash[0]].length && ret.exit == 0; z++)
        {
          for (var p = 0; p < memory[memory_hash[0]][z].Binary.length && ret.exit == 0; p++)
          {
            if (tag == memory[memory_hash[0]][z].Binary[p].Tag)
	    {
                ret.exit  = 1;
                ret.value = parseInt(memory[memory_hash[0]][z].Address, 10);
	        return ret ;
            }
          }
        }

        // Search tag in text segment
        for (var z = 0; z < memory[memory_hash[1]].length && ret.exit == 0; z++)
        {
          for (var p = 0; p < memory[memory_hash[1]][z].Binary.length && ret.exit == 0; p++)
	  {
            if (tag == memory[memory_hash[1]][z].Binary[p].Tag)
	    {
                ret.exit  = 1;
                ret.value = parseInt(memory[memory_hash[1]][z].Address, 10);
	        return ret ;
            }
          }
        }

        return ret ;
}

function creator_memory_copytoapp ( hash_index )
{
        // NEW
        if (typeof app !== "undefined") {
            //app._data.main_memory          = main_memory ;           // TODO
            //app._data.main_memory_datatype = main_memory_datatype ;  // TODO
	}

        // OLD
        if (typeof app !== "undefined") {
            app._data.memory[memory_hash[hash_index]] = memory[memory_hash[hash_index]] ;
	}
}

function creator_insert_instruction ( auxAddr, value, def_value, hide, hex, fill_hex, label )
{
        // NEW
        var size = Math.ceil(hex.toString().length / 2) ;
	main_memory_storedata(auxAddr, hex, size, label, def_value, def_value, "instruction") ;
	// return main_memory_storedata(auxAddr, hex, size, label, def_value, def_value, "instruction") ; // FUTURE

        // OLD
	for(var a = 0; a < hex.length/2; a++)
	{
	  var sub_hex = hex.substring(hex.length-(2+(2*a)), hex.length-(2*a));
	  if (auxAddr % 4 == 0)
	  {
	     memory[memory_hash[1]].push({Address: auxAddr, Binary: [], Value: value, DefValue: def_value, hide: hide});
	     if (label == "") {
	         label=null;
	     }

	     if (a == 0) {
	       (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: sub_hex, Bin: sub_hex, Tag: label},);
	     }
	     else{
	       (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: sub_hex, Bin: sub_hex, Tag: null},);
	     }

	     auxAddr++;
	  }
	  else
	  {
	     if (a == 0) {
	       console_log(label);
	       (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: sub_hex, Bin: sub_hex, Tag: label},);
	     }
	     else{
	       (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: sub_hex, Bin: sub_hex, Tag: null},);
	     }

	     auxAddr++;
	  }
	}

	if (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length < 4)
	{
	   var num_iter = 4 - memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length;
	   for (var b = 0; b < num_iter; b++) {
	        (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr + (b + 1)), DefBin: fill_hex, Bin: fill_hex, Tag: null},);
	   }
	}

	return auxAddr;
}

function creator_memory_stackinit ( stack_address )
{
        // NEW
        // return main_memory_write_bydatatype(parseInt(stack_address), "00", "word", "00") ; // FUTURE
        main_memory_write_bydatatype(parseInt(stack_address), "00", "word", "00") ;

        // OLD
        memory[memory_hash[2]].push({Address: stack_address, Binary: [], Value: null, DefValue: null, reset: false});

        for(var i = 0; i<4; i++){
            (memory[memory_hash[2]][memory[memory_hash[2]].length-1].Binary).push({Addr: stack_address + i, DefBin: "00", Bin: "00", Tag: null},);
        }
}

function creator_memory_storestring ( string, string_length, data_address, label, type, align )
{
        // NEW
	// return main_memory_storedata(data_address, string, string_length, label, string, string, type) + 1; // FUTURE
	main_memory_storedata(data_address, string, string_length, label, string, string, type) ;

        // OLD
	var ascii;
	var character;

	for (var i = 0; i < string_length; i++)
        {
	  ascii = "0"
	  character = "";
	  if (type != "space")
          {
	      ascii = string.charCodeAt(i);
	      character = string.charAt(i);
	  }

	  if ((data_address % align) != 0 && i == 0 && align != 0)
          {
	    while ((data_address % align) != 0)
            {
	      if (data_address % 4 == 0)
              {
	        memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false, type: type});
	        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
	        data_address++;
	      }
	      else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4)
              {
	        data_address++;
	      }
	      else
              {
	        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
	        data_address++;
	      }
	    }
	  }

	  if (data_address % 4 == 0)
          {
	    memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: character, DefValue: character, reset: false, type: type});

	    if (i == 0)
            {
	      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (ascii.toString(16)).padStart(2, "0"), Bin: (ascii.toString(16)).padStart(2, "0"), Tag: label},);

	      if (label != null) {
	          data_tag.push({tag: label, addr: data_address});
	      }
	      label = null;
	    }
	    else
            {
	      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (ascii.toString(16)).padStart(2, "0"), Bin: (ascii.toString(16)).padStart(2, "0"), Tag: null},);
	    }

	    data_address++;
	  }
	  else
          {
	    if (i == 0)
            {
	      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (ascii.toString(16)).padStart(2, "0"), Bin: (ascii.toString(16)).padStart(2, "0"), Tag: label},);
	      memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = character + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
	      memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = character + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;

	      if (label != null) {
	          data_tag.push({tag: label, addr: data_address});
	      }
	      label = null;
	    }
	    else
            {
	      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (ascii.toString(16)).padStart(2, "0"), Bin: (ascii.toString(16)).padStart(2, "0"), Tag: null},);
	      memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = character + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
	      memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = character + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
	    }

	    data_address++;
	  }
	}

	if (type == "asciiz")
        {
		if (data_address % 4 == 0)
                {
			memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: "", DefValue: "", reset: false, type: type});
			(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
		}
		else {
			(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
		}

		data_address++;
	}

	if (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4)
        {
	    var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
	    for (var i = 0; i < num_iter; i++) {
	        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + (i)), DefBin: "00", Bin: "00", Tag: null},);
	    }
	}

	return data_address;
}

