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

        var uielto_memory_data = {

			  props:      {
											memory:   { type: Array, required: true }
										},

				data: 			function () {
											return {
          							/*Memory table fields*/
      									memFields: ['Tag', 'Address', 'Binary', 'Value']
  										}
        						},

			  methods: 		{
			  							select_space_type(record, index){
								        if(record.type == "space" && (memory[memory_hash[0]][index].Binary[0].Tag != null) || memory[memory_hash[0]][index].Binary[1].Tag != null || memory[memory_hash[0]][index].Binary[2].Tag != null || memory[memory_hash[0]][index].Binary[3].Tag != null){
								        	app._data.row_index = index; //TODO: vue bidirectional updates
								        	app.$refs['space_modal'].show(); //TODO: vue bidirectional updates
								        }
								      }		
			  						},

      	template:   '	<div class="col-lg-12 col-sm-12">' +
										'	  <b-table sticky-header ' +
										'	           striped ' +
										'	           small ' +
										'	           hover ' +
										'	           :items="Object.values(memory)[0]" ' +
										'	           :fields="memFields" ' +
										'	           class="memory_table" ' +
										'	           @row-clicked="select_space_type"' +
										'	           id="data_memory_table">' +
										'	' +
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
										'	' +
										'	        </div>' +
										'	      </div>' +
										'	    </template>' +
										'	' +
										'	    <template v-slot:cell(Address)="row">' +
										'	      <span class="h6Sm">' +
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	    </template>' +
										'	' +
										'	    <template v-slot:cell(Binary)="row">' +
										'	      <span class="h6Sm">' +
										'	        <span class="memoryBorder" ' +
										'	              v-if="row.item.Binary[3].Tag != null">' +
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
										'	        </span>' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										'	    </template>' +
										'	    <template v-slot:cell(value)="row">' +
										'	      <span class="h6Sm">' +
										'	        {{row.item.Value}} ' +
										'	        <span class="fas fa-eye memoryValue" ' +
										'	              v-if="row.item.type == \'space\' && (row.item.Binary[0].Tag != null || row.item.Binary[1].Tag != null || row.item.Binary[2].Tag != null || row.item.Binary[3].Tag != null)">' +
										'	        </span>' +
										'	      </span> ' +
										'	    </template>' +
										'	  </b-table>' +
										'	</div>'
		  
				}

        Vue.component('table-mem-data', uielto_memory_data)