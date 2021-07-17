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

	props:     		 {
					main_memory:   	    { type: Array,  required: true },
					memory_segment:     { type: String, required: true },
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
					filter ( row, filter )
                                        {
						if ((this.memory_segment == "instructions_memory") && ((row.addr >= architecture.memory_layout[0].value) && (row.addr <= architecture.memory_layout[1].value))) {
							if(row.hide == true){
								return false;
							}
							else{
								return true;
							}
						}

						if ((this.memory_segment == "data_memory") && ((row.addr >= architecture.memory_layout[2].value) && (row.addr <= architecture.memory_layout[3].value))) {
							return true;
						}

						if ((this.memory_segment == "stack_memory") && ((row.addr >= architecture.memory_layout[3].value))) {
							return (Math.abs(row.addr - app._data.end_callee) < 40);
						}
					},

					//TODO: gereric and include modal
					select_data_type ( record, index )
                                        {
						if (this.memory_segment == "instructions_memory") {
							return
						}

						if (this.memory_segment == "data_memory")
						{
							if (this.check_tag_null(record.hex)) {
								app._data.row_index = index; //TODO: vue bidirectional updates
								app.$refs['space_modal'].show(); //TODO: vue bidirectional updates
							}
						}

						if (this.memory_segment == "stack_memory")
						{
							app._data.row_index = index;  //TODO: vue bidirectional updates
							app.$refs['stack_modal'].show(); //TODO: vue bidirectional updates
						}
					},

					check_tag_null ( record )
                                        {
						for (var i = 0; i < record.length; i++) {
							if (record[i].tag != null){
								return true;
							}
						}

						return false;
					},				

					get_classes ( row )
                                        {
						return {
						          'h6Sm                ':  ((row.item.addr >= architecture.memory_layout[0].value) && (row.item.addr <= architecture.memory_layout[3].value)),
						          'h6Sm text-secondary ':  ((row.item.addr < app._data.end_callee)                 && (Math.abs(row.item.addr - app._data.end_callee) < 40)),
						          'h6Sm text-success   ':  ((row.item.addr < app._data.begin_callee)               && (row.item.addr >= app._data.end_callee)),
						          'h6Sm text-blue-funny':  ((row.item.addr < app._data.begin_caller)               && (row.item.addr >= app._data.end_caller)),
						          'h6Sm                ':  (row.item.addr >= app._data.begin_caller)
						       }
					}				
				},
	computed:		{
					main_memory_items ()
                                        {
					    return Object.entries(this.main_memory)
					                 .sort((a, b) => a[0] - b[0])
					                 .map(a => a[1])
					}
		  		},

	template:   		'	<div class="col-lg-12 col-sm-12 px-0">' +
				'' +
				'<span class="container">' +
				'  <b-row align-v="start">' +
				'  <b-col style="min-height:35vh !important;">' +
				' ' +
				'	  <b-table sticky-header ' +
				'	           striped ' +
				'	           small ' +
				'	           hover ' +
				'	           :items="main_memory_items" ' +
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
				'	                   v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'data\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.addr & 0xFFFFFFFC))">' +
				'	            {{item2.name[0]}}' +
				'	          </b-badge>' +
				'	          <span class="fas fa-long-arrow-alt-right" ' +
				'	                v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'data\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.addr & 0xFFFFFFFC))">' +
				'	          </span>' +
				'	          <b-badge variant="success" ' +
				'	                   class="border border-success shadow memoryTag" ' +
				'	                   v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'code\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.addr & 0xFFFFFFFC))">' +
				'	            {{item2.name[0]}}' +
				'	          </b-badge>' +
				'	          <span class="fas fa-long-arrow-alt-right" ' +
				'	                v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'code\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.addr & 0xFFFFFFFC))">' +
				'	          </span>' +
				'	          <b-badge variant="info" ' +
				'	                   class="border border-info shadow memoryTag" ' +
				'	                   v-if="item2.properties.includes(\'pointer\') && (item2.properties.includes(\'stack\') || item2.properties.includes(\'frame\'))&& ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.addr & 0xFFFFFFFC))">' +
				'	            {{item2.name[0]}}' +
				'	          </b-badge>' +
				'	          <span class="fas fa-long-arrow-alt-right" ' +
				'	                v-if="item2.properties.includes(\'pointer\') && (item2.properties.includes(\'stack\') || item2.properties.includes(\'frame\') )&& ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.addr & 0xFFFFFFFC))">' +
				'	          </span>' +
				'	' +
				'	        </div>' +
				'	      </div>' +
				'	    </template>' +
				'	' +
				'	    <template v-slot:cell(Address)="row">' +
				'             <span class="h6Sm" v-bind:class="get_classes(row)">' +
				'	        {{row.item.addr_begin}} - {{row.item.addr_end}}' +
				'	      </span>' +
				'	    </template>' +
				'	' +
				'	    <template v-slot:cell(Binary)="row">' +
				'             <span class="h6Sm" v-bind:class="get_classes(row)">' +
				' 		<span v-for="item in row.item.hex">' +
				'' +
				'	        	<span v-if="item.tag == null">' +
				'	          	{{item.byte.toUpperCase()}}' +
				'	        	</span> ' +
				'' +
				'	        	<b-badge pill variant="info" ' +
				'	          	       class="border border-info shadow binaryTag" ' +
				'	            	       v-if="item.tag != null">' +
				'	          	{{item.tag}}' +
				'	        	</b-badge>' +
				'	        	<br   v-if="item.tag != null">' +
				'	        	<span v-if="item.tag != null" class="memoryBorder">' +
				'	          	{{item.byte.toUpperCase()}}' +
				'	        	</span> ' +
				'' +
				' 		</span>' +
				'	      </span>' +
				'	    </template>' +
				'	' +
				'	    <template v-slot:cell(Value)="row">' +
				'             <span class="h6Sm" v-bind:class="get_classes(row)">' +
				'               {{row.item.value}}' +
				'	        <span class="fas fa-eye memoryValue" ' +
				'	              v-if="row.item.eye && check_tag_null(row.item.hex)">' +
				'	        </span>' +
				'	    </template>' +
				'         </b-table>' +
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

