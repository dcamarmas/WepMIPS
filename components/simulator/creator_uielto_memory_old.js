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


				/* jshint esversion: 6 */

				var uielto_memory = {

				props:      {
											memory:   	        { type: Array,  required: true },
											memory_segment:   	{ type: String, required: true },
											track_stack_names:  { type: Array,  required: true }, //TODO: optional
											callee_subrutine:   { type: String, required: true }, //TODO: optional
											caller_subrutine:   { type: String, required: true }  //TODO: optional
										},

				data: 			function () {
											return {
												/*Memory table fields*/
												memFields: ['Tag', 'Address', 'Binary', 'Value']
											}
										},

				methods: 		{
											/*Filter table*/
											filter(row, filter){
												if (this.memory_segment == "instructions_memory") {
													if(row.hide == true){
														return false;
													}
													else{
														return true;
													}
												}
												if (this.memory_segment == "data_memory") {
													return true;
												}
												if (this.memory_segment == "stack_memory") {
													return (Math.abs(row.Address - app._data.end_callee) < 40);
												}
											},

											//TODO: gereric and include modal
											select_data_type(record, index){
												if (this.memory_segment == "instructions_memory") {
													return
												}
												if (this.memory_segment == "data_memory") {
													if(record.type == "space" && (memory[memory_hash[0]][index].Binary[0].Tag != null) || memory[memory_hash[0]][index].Binary[1].Tag != null || memory[memory_hash[0]][index].Binary[2].Tag != null || memory[memory_hash[0]][index].Binary[3].Tag != null){
														app._data.row_index = index; //TODO: vue bidirectional updates
														app.$refs['space_modal'].show(); //TODO: vue bidirectional updates
													}
												}
												if (this.memory_segment == "stack_memory") {
													app._data.row_index = index;  //TODO: vue bidirectional updates
													app.$refs['stack_modal'].show(); //TODO: vue bidirectional updates
												}
											}				
										},

				template:   '	<div class="col-lg-12 col-sm-12 px-0">' +
										'' +
										'<span class="container">' +
										'  <b-row align-v="start">' +
										'  <b-col style="min-height:35vh !important;">' +
										'' +
										'	  <b-table sticky-header ' +
										'	           striped ' +
										'	           small ' +
										'	           hover ' +
										'	           :items="memory[memory_segment]" ' +
										'	           :fields="memFields" ' +
										'	           :filter-function=filter ' +
										'	           filter=" " ' +
										'	           class="memory_table align-items-start" ' +
										'	           @row-clicked="select_data_type">' +
										'	' +
										'	    <template v-slot:head(Tag)="row">' +
										'	      &nbsp;' +
										'	    </template>' +
										'	' +
										'	    <template v-slot:cell(Tag)="row">' +
										'	      <div v-for="item in architecture_hash">' +
										'	        <div v-for="item2 in architecture.components[item.index].elements">' +
										'	          <b-badge variant="info" ' +
										'	                   class="border border-info shadow memoryTag" ' +
										'	                   v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'data\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.Address & 0xFFFFFFFC))">' +
										'	            {{item2.name[0]}}' +
										'	          </b-badge>' +
										'	          <span class="fas fa-long-arrow-alt-right" ' +
										'	                v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'data\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.Address & 0xFFFFFFFC))">' +
										'	          </span>' +
										'	          <b-badge variant="success" ' +
										'	                   class="border border-success shadow memoryTag" ' +
										'	                   v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'code\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.Address & 0xFFFFFFFC))">' +
										'	            {{item2.name[0]}}' +
										'	          </b-badge>' +
										'	          <span class="fas fa-long-arrow-alt-right" ' +
										'	                v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'code\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.Address & 0xFFFFFFFC))">' +
										'	          </span>' +
										'	          <b-badge variant="info" ' +
										'	                   class="border border-info shadow memoryTag" ' +
										'	                   v-if="item2.properties.includes(\'pointer\') && (item2.properties.includes(\'stack\') || item2.properties.includes(\'frame\'))&& ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.Address & 0xFFFFFFFC))">' +
										'	            {{item2.name[0]}}' +
										'	          </b-badge>' +
										'	          <span class="fas fa-long-arrow-alt-right" ' +
										'	                v-if="item2.properties.includes(\'pointer\') && (item2.properties.includes(\'stack\') || item2.properties.includes(\'frame\') )&& ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.Address & 0xFFFFFFFC))">' +
										'	          </span>' +
										'	' +
										'	        </div>' +
										'	      </div>' +
										'	    </template>' +
										'	' +
										'	    <template v-slot:cell(Address)="row">' +
										'	      <span class="h6Sm" v-if="((row.item.Address >= architecture.memory_layout[0].value) && (row.item.Address <= architecture.memory_layout[1].value))">' + //text
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	      <span class="h6Sm" v-if="((row.item.Address >= architecture.memory_layout[2].value) && (row.item.Address <= architecture.memory_layout[3].value))">' + //data
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	      <span class="h6Sm text-secondary" v-if="((row.item.Address < app._data.end_callee) && (Math.abs(row.item.Address - app._data.end_callee) < 40))">' + //Llamado
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	      <span class="h6Sm text-success" v-if="((row.item.Address < app._data.begin_callee) && (row.item.Address >= app._data.end_callee))">' + //Llamante
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	      <span class="h6Sm text-blue-funny" v-if="((row.item.Address < app._data.begin_caller) && (row.item.Address >= app._data.end_caller))">' +
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	      <span class="h6Sm" v-if="(row.item.Address >= app._data.begin_caller)">' + //Antes del llamante
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	    </template>' +
										'	' +
										'	    <template v-slot:cell(Binary)="row">' +
										'       <span class="h6Sm" v-if="((row.item.Address >= architecture.memory_layout[0].value) && (row.item.Address <= architecture.memory_layout[1].value))">' + //data
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										'       <span class="h6Sm" v-if="((row.item.Address >= architecture.memory_layout[2].value) && (row.item.Address <= architecture.memory_layout[3].value))">' + //text
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										'	      <span class="h6Sm text-secondary" v-if="((row.item.Address < app._data.end_callee) && (Math.abs(row.item.Address - app._data.end_callee) < 40))">' + //Llamado
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										'	' +
										'	      <span class="h6Sm text-success" v-if="((row.item.Address < app._data.begin_callee) && (row.item.Address >= app._data.end_callee))">' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										' ' +
										'	      <span class="h6Sm text-blue-funny" v-if="((row.item.Address < app._data.begin_caller) && (row.item.Address >= app._data.end_caller))">' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										' ' +
										'	      <span class="h6Sm" v-if="(row.item.Address >= app._data.begin_caller)">' + //Antes del llamante
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										'	' +
										'	    </template>' +
										'	    <template v-slot:cell(Value)="row">' +
										'	      <span class="h6Sm"                 v-if="((row.item.Address >= architecture.memory_layout[0].value) && (row.item.Address <= architecture.memory_layout[1].value))">{{row.item.Value}}</span>' + //text
										'	      <span class="h6Sm"                 v-if="((row.item.Address >= architecture.memory_layout[2].value) && (row.item.Address <= architecture.memory_layout[3].value))">' + //data
										'         {{row.item.Value}}' +
										'	        <span class="fas fa-eye memoryValue" ' +
										'	              v-if="row.item.type == \'space\' && (row.item.Binary[0].Tag != null || row.item.Binary[1].Tag != null || row.item.Binary[2].Tag != null || row.item.Binary[3].Tag != null)">' +
										'	        </span>' +
										'       </span>' +
										'	      <span class="h6Sm text-secondary"  v-if="((row.item.Address < app._data.end_callee) && (Math.abs(row.item.Address - app._data.end_callee) < 40))">{{row.item.Value}}</span>' +
										'	      <span class="h6Sm text-success"    v-if="((row.item.Address < app._data.begin_callee) && (row.item.Address >= app._data.end_callee))">{{row.item.Value}}</span>' +
										'	      <span class="h6Sm text-blue-funny" v-if="((row.item.Address < app._data.begin_caller) && (row.item.Address >= app._data.end_caller))">{{row.item.Value}}</span>' +
										'	      <span class="h6Sm"                 v-if="(row.item.Address >= app._data.begin_caller)">{{row.item.Value}}</span>' +
										'	    </template>' +
										'	  </b-table>' +
										'' +
										'  </b-col>' +
										'  </b-row>' +
										'' +
										'  <b-row align-v="end">' +
										'  <b-col>' +
										'' +
										'  <div class="col-lg-12 col-sm-12 row mx-0 px-2 border" v-if="memory_segment == \'stack_memory\'">' + //TODO: only in stack
										'  	<span class="col-lg-12 col-sm-12 my-1">' +
										'       <span>Stack memory keys:</span>' +
										'  	</span>' +
										'' +
										'  	<span class="badge badge-white border border-secondary text-secondary mx-1 col">Free <br>stack</span>' +
										'  	<span class="badge badge-white border border-secondary text-success mx-1">Callee: <br>{{callee_subrutine}}</span>' +
										'  	<span class="badge badge-white border border-secondary text-info mx-1" v-if="track_stack_names.length > 1">Caller: <br>{{caller_subrutine}}</span>' +
										'  	<span class="badge badge-white border border-secondary text-dark mx-1" v-if="track_stack_names.length > 2" align-v="center"><b>&bull;&bull;&bull;<br>{{track_stack_names.length - 2}}</b></span>' +
										'  	<span class="badge badge-white border border-secondary text-dark mx-1">System <br>stack</span>' +
										'  </div>' +
										'' +
										'  </b-col>' +
										'  </b-row>' +
										'</span>' +
										'' +
										' </div>'
				}

				Vue.component('table-mem', uielto_memory) ;

