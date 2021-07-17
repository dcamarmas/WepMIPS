/*
 *  Copyright 2018-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Diego Camarmas Alonso
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


/*General*/
var toHandler = null;


/****************
 * Vue instance *
 ****************/

try
{

  window.app = new Vue({

    /*DOM ID*/
    el: "#app",

    /*Vue data*/
    data: {

      /*Global*/
      /*Number Version*/
      version: '',
      /*View*/
      creator_mode: "load_architecture",
      /*Notification speed*/
      notificationTime: 1500,
      /*Auto Scroll*/
      autoscroll: true,
      /*Auto Scroll*/
      fontSize: 15,
      /*Debug*/
      c_debug: false,
      /*Dark Mode*/
      dark: false,

      /*Architecture editor*/

      /*Available architectures*/
      arch_available: architecture_available,
      /*Architectures card background*/
      back_card: back_card,
      /*Backup date*/
      date_copy: '',
      /*New architecture modal*/
      showLoadArch: false,
      /*New architecture form*/
      name_arch: '',
      description_arch: '',
      load_arch: '',
      /*Delete architecture modal*/
      modalDeletArch:{
        title: '',
        index: 0,
      },
      /*Architecture name*/
      architecture_name: '',
      /*Architecture bits*/
      number_bits: 32,
      /*Load architecture*/
      architecture: architecture,
      architecture_hash: architecture_hash,
      /*Saved file name*/
      name_arch_save: '',
      /*Advanced mode*/
      advanced_mode: true,
      /*Memory layout form*/
      memory_layout: ["", "", "", "", "", ""],
      /*Memory layout reset*/
      modalResetMem: {
        title: '',
        element: '',
      },
      /*Align memory*/
      align: false,
      /*Component table fields*/
      archFields: ['name', 'ID', 'nbits', 'default_value', 'properties', 'actions'],
      /*Components types*/
      componentsTypes: componentsTypes,
      /*Floating point registers*/
      simple_reg: [],
      /*Components reset*/
      modalResetArch: {
        title: '',
        element: '',
      },
      /*Modals components*/
      showNewComponent: false,
      showEditComponent: false,
      /*Edit component modal*/
      modalEditComponent: {
        title: '',
        element: '',
      },
      /*Delete component modal*/
      modalDeletComp:{
        title: '',
        element: '',
      },
      /*Modals elements*/
      showNewElement: false,
      showEditElement: false,
      /*New element modal*/
      modalNewElement:{
        title: '',
        element: '',
        type: '',
        double_precision: '',
        simple1: '',
        simple2: '',
      },
      /*Edit element modal*/
      modalEditElement:{
        title: '',
        element: '',
        type: '',
        double_precision: '',
        simple1: '',
        simple2: '',
      },
      /*Delete element modal*/
      modalDeletElement:{
        title: '',
        element: '',
      },
      /*Element form*/
      formArchitecture: {
        name: '',
        id: '',
        type: '',
        defValue: '',
        properties: [],
        precision: '',
      },
      /*Instructions table fields*/
      instFields: ['name', 'co', 'cop', 'nwords', 'properties', 'signatureRaw', 'fields', 'definition', 'actions'],
      /*Instructions types*/
      instructionsTypes: instructionsTypes,
      /*Instructions fields*/
      modalViewFields:{
        title: '',
        element: '',
        co: '',
        cop: '',
      },
      /*Instructions reset*/
      modalResetInst:{
        title: '',
        element: '',
      },
      /*Modals instructions*/
      showNewInstruction: false,
      showEditInstruction: false,
      /*Modal pagination*/
      instructionFormPage: 1,
      instructionFormPageLink: ['#Principal', '#Fields', '#Syntax', '#Definition', '#Help'],
      /*Edit instruction modal*/
      modalEditInst:{
        title: '',
        element: '',
        co: '',
        cop: '',
      },
      /*Delete instruction modal*/
      modalDeletInst:{
        title: '',
        element: '',
        index: 0,
      },
      /*Instruction form*/
      formInstruction: {
        name: '',
        type: '',
        co: '',
        cop: '',
        nwords: 1,
        help: '',
        properties: [],
        numfields: "1",
        numfieldsAux: "1",
        nameField: [],
        typeField: [],
        separated: [],
        startBitField: [],
        stopBitField: [],
        valueField: [],
        assignedCop: false,
        signature: '',
        signatureRaw: '',
        signature_definition: '',
        definition: '',
      },
      /*Pseudoinstructions table fields*/
      pseudoinstFields: ['name', 'nwords', 'signatureRaw', 'fields', 'definition', 'actions'],
      /*Pseudoinstructions reset*/
      modalResetPseudoinst:{
        title: '',
        element: '',
      },
      /*Modals pseudoinstructions*/
      showNewPseudoinstruction: false,
      showEditPseudoinstruction: false,
      /*Edit pseudoinstruction modal*/
      modalEditPseudoinst:{
        title: '',
        element: '',
        index: 0,
      },
      /*Delete pseudoinstruction modal*/
      modalDeletPseudoinst:{
        title: '',
        element: '',
        index: 0,
      },
      /*Pseudoinstruction form*/
      formPseudoinstruction: {
        name: '',
        nwords: 1,
        numfields: "0",
        numfieldsAux: "0",
        nameField: [],
        typeField: [],
        startBitField: [],
        stopBitField: [],
        signature: '',
        signatureRaw: '',
        signature_definition: '',
        definition: '',
        help: '',
      },
      /*Directives table fields*/
      directivesFields: ['name', 'action', 'size', 'actions'],
      /*Directives types*/
      actionTypes: actionTypes,
      /*Directives reset*/
      modalResetDir: {
        title: '',
        element: '',
      },
      /*Modals directives*/
      showNewDirective: false,
      showEditDirective: false,
      /*Edit directive modal*/
      modalEditDirective:{
        title: '',
        element: '',
      },
      /*Delete pseudoinstruction modal*/
      modalDeletDir:{
        title: '',
        element: '',
      },
      /*Directive form*/
      formDirective:{
        name: '',
        action: '',
        size: 0,
      },
      /* Allow instruction with fractioned fields */
      fragmentData:["inm-signed", "inm-unsigned", "address", "offset_bytes", "offset_words"],



      /*Compilator*/

      /*Available examples*/
      example_available: example_available,
      example_loaded: null,

      load_assembly: '',
      /*Saved file name*/
      save_assembly: '',
      /*Code error modal*/
      modalAssemblyError:{
        code1: '',
        code2: '',
        code3: '',
        error: '',
      },
      /*Binary code loaded*/
      name_binary_load: '',
      /*Load binary*/
      load_binary: false,
      update_binary: update_binary,
      /*Saved file name*/
      name_binary_save: '',
      /*Assembly code*/
      assembly_code: "",



      /*Simulator*/

      /*Alert toasts content*/
      alertMessage: '',
      type: '',
      /*Displayed notifications*/
      notifications: notifications,
      /*Accesskey*/
      browser: "",
      /*Run instructions*/
      instructionsPacked: 20,
      /*Run button*/
      runExecution: false,
      /*Reset button*/
      resetBut: false,
      /*Instructions memory*/
      instructions: instructions,
      /*Registers*/
      register_type: 'integer',
      name_tab_Reg: 'Decimal',
      name_reg: 'INT Registers',
      reg_type: 'int',
      register_popover: '',
      /*Data mode*/
      data_mode: 'registers',
      /*Register form*/
      newValue: '',





      reg_representation: "signed",
      reg_representation_options: [
          { text: 'Signed', value: 'signed' },
          { text: 'Unsigned', value: 'unsigned' },
          { text: 'IEEE 754', value: 'decimal'},
          { text: 'Hexadecimal', value: 'hex' }
        ],

      reg_name_representation: "logical",
      reg_name_representation_options: [
          { text: 'Name', value: 'logical' },
          { text: 'Alias', value: 'alias' },
          { text: 'All', value: 'all'}
        ],


      /* 
       * Memory
       */
      memory:      memory, //TODO: delete
      memory_hash: ["data_memory", "instructions_memory", "stack_memory"],
      main_memory: {},

      row_index: null,           //TODO: try to include in a component
      selected_space_view: null, //TODO: try to include in a component
      selected_stack_view: null, //TODO: try to include in a component
      
      track_stack_names: track_stack_names,
      callee_subrutine: "",
      caller_subrutine: "",
      stack_pointer: 0,
      begin_caller: 0,
      end_caller: 0,
      begin_callee: 0,
      end_callee: 0,








      /*Stats*/
      totalStats: totalStats,
      stats: stats,
      /*Stats Graph values*/
      stats_value: stats_value,
      /*Display*/
      display: '',
      /*Keyboard*/
      keyboard: '',
      enter: null,
    },

    /*Created vue instance*/
    created(){
      this.load_num_version();
      this.load_arch_available();
      this.detectBrowser();
    },

    /*Mounted vue instance*/
    mounted(){
      this.backupCopyModal();
      this.verifyBrowser();
      this.get_configuration();

      // pre-load following URL params
      var url_hash = creator_preload_get2hash(window.location) ;
      creator_preload_fromHash(this, url_hash) ;
    },

    beforeUpdate(){
      this.get_dark_mode();
    },

    /*Vue methods*/
    methods: {
      /*Generic*/

      load_num_version(){
        $.getJSON('package.json', function(cfg){
          creator_information = cfg;
          app._data.version = cfg.version;
        });
      },

      verifyBrowser() {
        if (navigator.userAgent.indexOf("OPR") > -1) {
          this.$refs.browser.show();
        }
        else if (navigator.userAgent.indexOf("MIE") > -1) {
          this.$refs.browser.show();
        }
        else if (navigator.userAgent.indexOf("Edge") > -1) {
          this.$refs.browser.show();
        }
        else if(navigator.userAgent.indexOf("Chrome") > -1) {
          return;
        }
        else if (navigator.userAgent.indexOf("Safari") > -1) {
          return;
        }
        else if (navigator.userAgent.indexOf("Firefox") > -1) {
          return
        }
        else{
          this.$refs.browser.show();
        }
      },

      /*loads the configuration values from the last use*/
      get_configuration(){
      	if(localStorage.getItem("instructionsPacked") != null){
          this.instructionsPacked = parseInt(localStorage.getItem("instructionsPacked"));
        }

        if(localStorage.getItem("autoscroll") != null){
          this.autoscroll = (localStorage.getItem("autoscroll") === "true");
        }

        if(localStorage.getItem("notificationTime") != null){
          this.notificationTime = parseInt(localStorage.getItem("notificationTime"));

        }
      },

      /*Verify if dark mode was activated de last use*/
      get_dark_mode(){
        if(localStorage.getItem("dark_mode") != null){
          document.getElementsByTagName("body")[0].style = localStorage.getItem("dark_mode");
          if(localStorage.getItem("dark_mode") == ""){
            app._data.dark = false;
          }
          else{
            app._data.dark = true;
          }
        }
        else{
        	var default_style = window.matchMedia('(prefers-color-scheme: dark)').matches;
        	if(default_style == true){
        		document.getElementsByTagName("body")[0].style = "filter: invert(88%) hue-rotate(160deg) !important; background-color: #111 !important;";
        		app._data.dark = true;
        	}
        	else{
        		document.getElementsByTagName("body")[0].style = "";
          	app._data.dark = false;
        	}
        }
      },

      

      

      /*Screen change*/
      change_UI_mode(e) {
        if(app._data.creator_mode != e){

          if(app._data.creator_mode == "architecture"){
            app._data.advanced_mode = true;
          }

          // Close codemirror
          if(textarea_assembly_editor != null && e != "assembly"){
            app._data.assembly_code = textarea_assembly_editor.getValue();
            code_assembly = textarea_assembly_editor.getValue();
            codemirrorHistory = textarea_assembly_editor.getHistory();
            textarea_assembly_editor.toTextArea();
          }

          app._data.register_popover = '';
        	// slow transition <any> => "architecture"
        	if (e == "architecture")
        	{
        	    $(".loading").show();
              setTimeout(function(){
        		    app._data.creator_mode = e;
        			  app.$forceUpdate();
        	       $(".loading").hide();
        	     }, 50) ;
        	    return ;
        	}

        	// fast transition <any> => <any> - "architecture"
        	app._data.creator_mode = e;

        	if(e == "assembly"){
        	  setTimeout(function(){
        	    codemirrorStart();
              if (codemirrorHistory != null ){
                textarea_assembly_editor.setHistory(codemirrorHistory);
                textarea_assembly_editor.undo();
              }
              textarea_assembly_editor.setValue(code_assembly);
        	    if(app._data.update_binary != ""){
        	      $("#divAssembly").attr("class", "col-lg-10 col-sm-12");
        	      $("#divTags").attr("class", "col-lg-2 col-sm-12");
        	      $("#divTags").show();
        	    }
        	  },50);
        	}

        	app.$forceUpdate();
        }
      },


      /*Architecture editor*/

      /**
        * method in charge of create the array corresponent to the
        * current position of start bit and end bit
       */

      changeToSeparateValue( val, pos ) {
          if (val) {
            this.formInstruction.startBitField[pos] = [0];
            this.formInstruction.stopBitField[pos] =[0];
              if (this.formInstruction.typeField[pos] == 'co')
                  this.formInstruction.co = ['0'];
          } else {
            this.formInstruction.startBitField[pos] = 0;
            this.formInstruction.stopBitField[pos] =0;
              if (this.formInstruction.typeField[pos] == 'co')
                  this.formInstruction.co = '0';
          }
      },

      addMoreFieldsToSeparateValues(event, pos) {
        this.formInstruction.startBitField[pos].push(0);
        this.formInstruction.stopBitField[pos].push(0);
          if (this.formInstruction.typeField[pos] == 'co')
              this.formInstruction.co.push('0')
        app.$forceUpdate();
      },


      lessFieldsToSeparateValues(event, pos) {
          this.formInstruction.startBitField[pos].pop();
          this.formInstruction.stopBitField[pos].pop();
            if (this.formInstruction.typeField[pos] == 'co')
                this.formInstruction.co.pop()
          app.$forceUpdate();
      },

      /*Load the available architectures and check if exists backup*/
      load_arch_available() {
        $.getJSON('architecture/available_arch.json' + "?v=" + new Date().getTime(), function(cfg){
          architecture_available = cfg;

          if (typeof(Storage) !== "undefined"){
            if(localStorage.getItem("load_architectures_available") != null){
              var auxArch = localStorage.getItem("load_architectures_available");
              var aux = JSON.parse(auxArch);

              for (var i = 0; i < aux.length; i++){
                architecture_available.push(aux[i]);
                load_architectures_available.push(aux[i]);

                var auxArch2 = localStorage.getItem("load_architectures");
                var aux2 = JSON.parse(auxArch2);
                load_architectures.push(aux2[i]);
              }
            }
          }

          app._data.arch_available = architecture_available;

          for (var i = 0; i < architecture_available.length; i++){
            back_card.push({name: architecture_available[i].name , background: "default"});
          }
        });
      },

      /*Change the background of selected achitecture card*/
      change_background(name, type){
        if(type == 1){
          for (var i = 0; i < back_card.length; i++){
            if(name == back_card[i].name){
              back_card[i].background = "secondary";
            }
            else{
              back_card[i].background = "default";
            }
          }
        }
        if(type == 0){
          for (var i = 0; i < back_card.length; i++){
            back_card[i].background = "default";
          }
        }
      },

      /*Show backup modal*/
      backupCopyModal(){
        if (typeof(Storage) !== "undefined"){
          if(localStorage.getItem("architecture_copy") != null && localStorage.getItem("assembly_copy") != null && localStorage.getItem("date_copy") != null){
            this.date_copy = localStorage.getItem("date_copy");
            this.$refs.copyRef.show();
          }
        }
      },

      /*Auxiliar to Load the selected architecture*/
      load_arch_select_aux(ename, cfg, load_associated_examples, e)
      {
			  var auxArchitecture = cfg;
			  architecture = register_value_deserialize(auxArchitecture);
			  app._data.architecture = architecture;

			  architecture_hash = [];
			  for (i = 0; i < architecture.components.length; i++){
			       architecture_hash.push({name: architecture.components[i].name, index: i});
			       app._data.architecture_hash = architecture_hash;
			  }

			  backup_stack_address = architecture.memory_layout[4].value;
			  backup_data_address  = architecture.memory_layout[3].value;

			  app._data.architecture_name = ename;

			  //$("#architecture_menu").hide();
			  app.change_UI_mode('simulator');
			  app.change_data_view('registers', 'int');
			  app.$forceUpdate();

	      if (load_associated_examples && typeof e.examples !== "undefined"){
		      app.load_examples_available(e.examples[0]); //TODO if e.examples.length > 1 -> View example set selector
	      }
      },

      load_arch_select(e)
      {
        var i = -1;

        show_loading();
        for (i = 0; i < load_architectures.length; i++) {
             if (e.name == load_architectures[i].id) {
                 var auxArchitecture = JSON.parse(load_architectures[i].architecture);
                 app.load_arch_select_aux(e.name, auxArchitecture, true, e) ;
				         hide_loading();
				         show_notification('The selected architecture has been loaded correctly', 'success') ;

				         /* Google Analytics */
					       creator_ga('architecture', 'architecture.loading', 'architectures.loading.customized' + e.name);

                 return;
             }
        }

        $.getJSON('architecture/'+e.name+'.json' + "?v=" + new Date().getTime(), function(cfg) {
          app.load_arch_select_aux(e.name, cfg, true, e) ;
		      hide_loading();
		      show_notification('The selected architecture has been loaded correctly', 'success') ;

		      /* Google Analytics */
		      creator_ga('architecture', 'architecture.loading', 'architectures.loading.customized');

	        }).fail(function() {
	          hide_loading();
	          show_notification('The selected architecture is not currently available', 'info') ;
	        });

      },

      /*Read the JSON of new architecture*/
      read_arch(e){
        show_loading();

        e.preventDefault();
        if(!this.name_arch || !this.load_arch){
          hide_loading();
          show_notification('Please complete all fields', 'danger') ;
          return;
        }

        this.showLoadArch = false;

        var file;
        var reader;
        var files = document.getElementById('arch_file').files;

        for (var i = 0; i < files.length; i++){
          file = files[i];
          reader = new FileReader();
          reader.onloadend = onFileLoaded;
          reader.readAsBinaryString(file);
        }

        function onFileLoaded(event){
          architecture_available.push({name: app._data.name_arch, img: "./images/personalized_logo.png", alt: app._data.name_arch + " logo" , id:"select_conf"+app._data.name_arch , description: app._data.description_arch});
          load_architectures_available.push({name: app._data.name_arch, img: "./images/personalized_logo.png", alt: app._data.name_arch + " logo" , id:"select_conf"+app._data.name_arch , description: app._data.description_arch});
          back_card.push({name: architecture_available[architecture_available.length-1].name , background: "default"});
          load_architectures.push({id: app._data.name_arch, architecture: event.currentTarget.result});

          if (typeof(Storage) !== "undefined"){
            var auxArch = JSON.stringify(load_architectures, null, 2);
            localStorage.setItem("load_architectures", auxArch);

            auxArch = JSON.stringify(load_architectures_available, null, 2);
            localStorage.setItem("load_architectures_available", auxArch);
          }

          show_notification('The selected architecture has been loaded correctly', 'success') ;

          app._data.name_arch = '';
          app._data.description_arch = '';
          app._data.load_arch = '';

          hide_loading();
        }
      },

      /*Create a new architecture*/
      new_arch(){
        //$("#architecture_menu").hide();
        app.change_UI_mode('simulator');
        app.change_data_view('registers' , 'int');
        app.$forceUpdate();
        hide_loading();
      },

      /*Check if it is a new architecture*/
      default_arch(item){
        for (var i = 0; i < load_architectures_available.length; i++) {
          if(load_architectures_available[i].name == item){
            return true;
          }
        }
        return false;
      },

      /*Show remove architecture modal*/
      modal_remove_cache_arch(index, elem, button){
        this.modalDeletArch.title = "Delete Architecture";
        this.modalDeletArch.index = index;
        this.$root.$emit('bv::show::modal', 'modalDeletArch', button);
      },

      /*Remove architecture*/
      remove_cache_arch(index){
        var id = architecture_available[index].name;

        for (var i = 0; i < load_architectures.length; i++){
          if(load_architectures[i].id == id){
            load_architectures.splice(i, 1);
          }
        }

        for (var i = 0; i < load_architectures_available.length; i++){
          if(load_architectures_available[i].name == id){
            load_architectures_available.splice(i, 1);
          }
        }

        architecture_available.splice(index, 1);

        var auxArch = JSON.stringify(load_architectures, null, 2);
        localStorage.setItem("load_architectures", auxArch);

        auxArch = JSON.stringify(load_architectures_available, null, 2);
        localStorage.setItem("load_architectures_available", auxArch);

        show_notification('Architecture deleted successfully', 'success') ;
      },

      /*Save the current architecture in a JSON file*/
      arch_save(){
        var auxObject = jQuery.extend(true, {}, architecture);
        var auxArchitecture = register_value_serialize(auxObject);

      	auxArchitecture.components.forEach((c, i) => {
      		c.elements.forEach((e, j) => {
      			if (e.default_value) e.value = e.default_value;
      			else e.value = "0";
      		});
      	});

        var textToWrite = JSON.stringify(auxArchitecture, null, 2);
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/json' });
        var fileNameToSaveAs;

        if(this.name_arch_save == ''){
          fileNameToSaveAs = "architecture.json";
        }
        else{
          fileNameToSaveAs = this.name_arch_save + ".json";
        }

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "My Hidden Link";

        window.URL = window.URL || window.webkitURL;

        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();

        show_notification('Save architecture', 'success') ;
      },

      /*Change the execution mode of architecture editor*/
      change_mode(){
        if(app._data.advanced_mode == false){
          app._data.advanced_mode = true;
        }
        else{
          app._data.advanced_mode = false;
        }
      },

      /*Show reset modal of memory layout*/
      resetMemModal(elem, button){
        this.modalResetMem.title = "Reset memory layout";
        this.modalResetMem.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetMem', button);
      },

      /*Reset memory layout*/
      resetMemory(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++){
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = register_value_deserialize(auxArch);

            architecture.memory_layout = auxArchitecture.memory_layout;
            app._data.architecture = architecture;

            hide_loading();
            show_notification('The memory layout has been reset correctly', 'success') ;

            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = register_value_deserialize(auxArchitecture);
          architecture.memory_layout = auxArchitecture2.memory_layout;
          app._data.architecture = architecture;

          hide_loading();
          show_notification('The memory layout has been reset correctly', 'success') ;
        });
      },

      /*Check de memory layout changes*/
      changeMemoryLayout(){
        var auxMemoryLayout = jQuery.extend(true, {}, architecture.memory_layout);

        for(var i = 0; i < this.memory_layout.length; i++){
          if(this.memory_layout[i] != "" && this.memory_layout[i] != null){
            if(!isNaN(parseInt(this.memory_layout[i]))){
              auxMemoryLayout[i].value = parseInt(this.memory_layout[i]);
              if (auxMemoryLayout[i].value < 0) {
                  show_notification('The value can not be negative', 'danger') ;
                  return;
              }
            }
            else {
                  show_notification('The value must be a number', 'danger') ;
                  return;
            }
          }
        }

        for(var i = 0; i < 6; i++){
          /*if (i%2 == 0 && auxMemoryLayout[i].value % 4 != 0){
                show_notification('The memory must be aligned', 'danger') ;
                return;
            }*/

          for (var j = i; j < 6; j++) {
            if (auxMemoryLayout[i].value > auxMemoryLayout[j].value) {
                show_notification('The segment can not be overlap', 'danger') ;
                return;
            }
          }
        }

        for(var i = 0; i < 6; i++){
          architecture.memory_layout[i].value = auxMemoryLayout[i].value;
        }

        app._data.architecture = architecture;

        backup_stack_address = architecture.memory_layout[4].value;
        backup_data_address = architecture.memory_layout[3].value;

        for(var i = 0; i < 6; i++){
          app._data.memory_layout[i] = "";
        }
        app.$forceUpdate();
      },

      /*Register ID assigment*/
      element_id(name, type, double){
        var id = 0;
        for(var i = 0; i < architecture.components.length; i++){
          for(var j = 0; j < architecture.components[i].elements.length; j++){
            if(architecture.components[i].elements[j].name == name){
              return id;
            }
            if(architecture.components[i].type == type && architecture.components[i].double_precision == double){
              id++;
            }
          }
        }
      },

      /*Show reset modal of components*/
      resetArchModal(elem, button){
        this.modalResetArch.title = "Reset " + elem + " registers";
        this.modalResetArch.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetArch', button);
      },

      /*Reset components*/
      resetArchitecture(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++){
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = register_value_deserialize(auxArch);

            architecture.components = auxArchitecture.components;
            app._data.architecture = architecture;

            architecture_hash = [];
            for (var i = 0; i < architecture.components.length; i++) {
              architecture_hash.push({name: architecture.components[i].name, index: i});
              app._data.architecture_hash = architecture_hash;
            }

            hide_loading();
            show_notification('The registers has been reset correctly', 'success') ;

            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = register_value_deserialize(auxArchitecture);
          architecture.components = auxArchitecture2.components;

          app._data.architecture = architecture;

          architecture_hash = [];
          for (var i = 0; i < architecture.components.length; i++){
            architecture_hash.push({name: architecture.components[i].name, index: i});
            app._data.architecture_hash = architecture_hash;
          }

          hide_loading();
          show_notification('The registers has been reset correctly', 'success') ;
        });
      },

      /*Verify all field of new component*/
      newComponentVerify(evt){
        evt.preventDefault();
        if (!this.formArchitecture.name || !this.formArchitecture.type) {
            show_notification('Please complete all fields', 'danger') ;
        }
        else{
          this.newComponent();
        }
      },
      /*Create a new component*/
      newComponent(){
        for (var i = 0; i < architecture_hash.length; i++) {
          if (this.formArchitecture.name == architecture_hash[i].name) {
              show_notification('The component already exists', 'danger') ;
              return;
          }
        }

        this.showNewComponent = false;

        var precision = false;
        if (this.formArchitecture.precision == "precision"){
            precision = true;
        }

        var newComp = {name: this.formArchitecture.name, type: this.formArchitecture.type, double_precision: precision ,elements:[]};
        architecture.components.push(newComp);
        var newComponentHash = {name: this.formArchitecture.name, index: architecture_hash.length};
        architecture_hash.push(newComponentHash);
      },
      /*Show edit component modal*/
      editCompModal(comp, index, button){
        this.modalEditComponent.title = "Edit Component";
        this.modalEditComponent.element = comp;
        this.formArchitecture.name = comp;
        this.$root.$emit('bv::show::modal', 'modalEditComponent', button);
      },
      /*Verify all field of modified component*/
      editCompVerify(evt, comp){
        evt.preventDefault();
        if (!this.formArchitecture.name) {
            show_notification('Please complete all fields', 'danger') ;
        }
        else {
            this.editComponent(comp);
        }
      },

      /*Edit the component*/
      editComponent(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          if ((this.formArchitecture.name == architecture_hash[i].name) && (comp != this.formArchitecture.name)){
              show_notification('The component already exists', 'danger') ;
              return;
          }
        }

        this.showEditComponent = false;

        for (var i = 0; i < architecture_hash.length; i++){
          if(comp == architecture_hash[i].name){
            architecture_hash[i].name = this.formArchitecture.name;
            architecture.components[i].name = this.formArchitecture.name;
          }
        }
        this.formArchitecture.name ='';
      },

      /*Show delete component modal*/
      delCompModal(elem, button){
        this.modalDeletComp.title = "Delete Component";
        this.modalDeletComp.element = elem;
        this.$root.$emit('bv::show::modal', 'modalDeletComp', button);
      },

      /*Delete the component*/
      delComponent(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          if(comp == architecture_hash[i].name){
            architecture.components.splice(i,1);
            architecture_hash.splice(i,1);
            for (var j = 0; j < architecture_hash.length; j++){
              architecture_hash[j].index = j;
            }
          }
        }
      },

      /*Show new element modal*/
      newElemModal(comp, index, button){
        this.modalNewElement.title = "New element";
        this.modalNewElement.element = comp;
        this.modalNewElement.type = architecture.components[index].type;
        this.modalNewElement.double_precision = architecture.components[index].double_precision;

        this.$root.$emit('bv::show::modal', 'modalNewElement', button);

        app._data.simple_reg = [];
        for (var i = 0; i < architecture_hash.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length && architecture.components[i].type =="floating point" && architecture.components[i].double_precision == false; j++){
            app._data.simple_reg.push({ text: architecture.components[i].elements[j].name, value: architecture.components[i].elements[j].name},);
          }
        }

        var id = 0;
        for(var i = 0; i < architecture.components.length; i++){
          for(var j = 0; j < architecture.components[i].elements.length; j++){
            if(architecture.components[i].name == comp && architecture.components[i].elements.length-1 == j){
              id++;
              this.formArchitecture.id = id;
            }
            if(architecture.components[i].type == architecture.components[index].type && architecture.components[i].double_precision == architecture.components[index].double_precision){
              id++;
            }
          }
        }
      },

      /*Verify all field of new element*/
      newElementVerify(evt, comp){
        if (this.formArchitecture.name.length == 0 || !this.formArchitecture.name){
             show_notification('Please complete all fields', 'danger') ;
        }
        else{
          if (!this.formArchitecture.defValue && this.formArchitecture.double_precision == false){
             show_notification('Please complete all fields', 'danger') ;
          }
          else if(isNaN(this.formArchitecture.defValue)){
             show_notification('The default value must be a number', 'danger') ;
          }
          else{
            this.newElement(comp);
          }
        }
      },


      /*Create a new element*/
      newElement(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            for (var z = 0; z < this.formArchitecture.name.length; z++){
	            if ((architecture.components[i].elements[j].name.includes(this.formArchitecture.name[z]) != false) && (comp != this.formArchitecture.name)){
	                show_notification('The element already exists', 'danger') ;
	                return;
	            }
	          }
          }
        }

        this.showNewElement = false;

        for (var i = 0; i < architecture_hash.length; i++){
          if((comp == architecture_hash[i].name)&&(architecture.components[i].type == "integer")){
            var newElement = {name:this.formArchitecture.name, nbits: this.number_bits, value: bi_intToBigInt(this.formArchitecture.defValue,10), default_value:bi_intToBigInt(this.formArchitecture.defValue,10), properties: this.formArchitecture.properties};
            architecture.components[i].elements.push(newElement);
            break;
          }
          if((comp == architecture_hash[i].name)&&(architecture.components[i].type == "control")){
            var newElement = {name:this.formArchitecture.name, nbits: this.number_bits, value: bi_intToBigInt(this.formArchitecture.defValue,10), default_value:bi_intToBigInt(this.formArchitecture.defValue,10), properties: ["read", "write"]};
            architecture.components[i].elements.push(newElement);
            break;
          }
          if((comp == architecture_hash[i].name)&&(architecture.components[i].type == "floating point")&&(architecture.components[i].double_precision == false)){
            var newElement = {name:this.formArchitecture.name, nbits: this.number_bits, value: parseFloat(this.formArchitecture.defValue), default_value:parseFloat(this.formArchitecture.defValue), properties: this.formArchitecture.properties};
            architecture.components[i].elements.push(newElement);
            break;
          }
          if((comp == architecture_hash[i].name)&&(architecture.components[i].type == "floating point")&&(architecture.components[i].double_precision == true)){
            var aux_new;
            var aux_value;
            var aux_sim1;
            var aux_sim2;

            for (var a = 0; a < architecture_hash.length; a++){
              for (var b = 0; b < architecture.components[a].elements.length; b++) {
                if(architecture.components[a].elements[b].name == this.formArchitecture.simple1){
                  aux_sim1 = this.bin2hex(this.float2bin(architecture.components[a].elements[b].default_value));
                }
                if(architecture.components[a].elements[b].name == this.formArchitecture.simple2){
                  aux_sim2 = this.bin2hex(this.float2bin(architecture.components[a].elements[b].default_value));
                }
              }
            }

            aux_value = aux_sim1 + aux_sim2;
            aux_new = this.hex2double("0x" + aux_value);

            var newElement = {name:this.formArchitecture.name, nbits: this.number_bits*2, value: aux_new, properties: this.formArchitecture.properties};
            architecture.components[i].elements.push(newElement);
            break;
          }
        }
      },

      /*Show edit element modal*/
      editElemModal(elem, comp, button){
        this.modalEditElement.title = "Edit Element";
        this.modalEditElement.element = elem;
        this.modalEditElement.type = architecture.components[comp].type;
        this.modalEditElement.double_precision = architecture.components[comp].double_precision;

        app._data.simple_reg = [];
        for (var i = 0; i < architecture_hash.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length && architecture.components[i].type =="floating point" && architecture.components[i].double_precision == false; j++){
            app._data.simple_reg.push({ text: architecture.components[i].elements[j].name, value: architecture.components[i].elements[j].name},);
          }
        }

        for(var j=0; j < architecture.components[comp].elements.length; j++){
          if(elem == architecture.components[comp].elements[j].name){
            this.formArchitecture.name = elem;
            this.formArchitecture.properties = architecture.components[comp].elements[j].properties;
            if(this.modalEditElement.double_precision == true){
              this.formArchitecture.simple1 = architecture.components[comp].elements[j].simple_reg[0];
              this.formArchitecture.simple2 = architecture.components[comp].elements[j].simple_reg[1];
            }
            else{
              this.formArchitecture.defValue = (architecture.components[comp].elements[j].default_value).toString();
            }
          }
        }

        var id = 0;
        for(var i = 0; i < architecture.components.length; i++){
          for(var j = 0; j < architecture.components[i].elements.length; j++){
            if(architecture.components[i].elements[j].name == this.formArchitecture.name){
              this.formArchitecture.id = id;
            }
            if(architecture.components[i].type == architecture.components[comp].type && architecture.components[i].double_precision == architecture.components[comp].double_precision){
              id++;
            }
          }
        }

        this.$root.$emit('bv::show::modal', 'modalEditElement', button);
      },

      /*Check all field of modified element*/
      editElementVerify(evt, comp){
        evt.preventDefault();
        if (this.formArchitecture.name.length == 0 || !this.formArchitecture.name || !this.formArchitecture.defValue) {
          show_notification('Please complete all fields', 'danger') ;
        }
        else if(isNaN(this.formArchitecture.defValue)){
          show_notification('The default value must be a number', 'danger') ;
        }
        else {
          this.editElement(comp);
        }
      },

      /*Modify element*/
      editElement(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
          	for (var z = 0; z < this.formArchitecture.name.length; z++){
	            if ((architecture.components[i].elements[j].name.includes(this.formArchitecture.name[z]) != false) && (comp != this.formArchitecture.name)){
	                show_notification('The element already exists', 'danger') ;
	                return;
	            }
	          }
          }
        }

        this.showEditElement = false;

        for (var i = 0; i < architecture_hash.length; i++){
          for(var j=0; j < architecture.components[i].elements.length; j++){
            if(comp == architecture.components[i].elements[j].name){
              architecture.components[i].elements[j].name = this.formArchitecture.name;
              if(architecture.components[i].type == "control" || architecture.components[i].type == "integer"){
                architecture.components[i].elements[j].default_value = bi_intToBigInt(this.formArchitecture.defValue,10) ;
              }
              else{
                if(architecture.components[i].double_precision == false){
                  architecture.components[i].elements[j].default_value = parseFloat(this.formArchitecture.defValue, 10);
                }
                else{

                  var aux_value;
                  var aux_sim1;
                  var aux_sim2;

                  for (var a = 0; a < architecture_hash.length; a++) {
                    for (var b = 0; b < architecture.components[a].elements.length; b++) {
                      if(architecture.components[a].elements[b].name == this.formArchitecture.simple1){
                        aux_sim1 = this.bin2hex(this.float2bin(architecture.components[a].elements[b].value));
                      }
                      if(architecture.components[a].elements[b].name == this.formArchitecture.simple2){
                        aux_sim2 = this.bin2hex(this.float2bin(architecture.components[a].elements[b].value));
                      }
                    }
                  }

                  aux_value = aux_sim1 + aux_sim2;

                  architecture.components[i].elements[j].value = this.hex2double("0x" + aux_value);

                  architecture.components[i].elements[j].simple_reg[0] = this.formArchitecture.simple1;
                  architecture.components[i].elements[j].simple_reg[1] = this.formArchitecture.simple2;
                }
              }
              architecture.components[i].elements[j].properties = this.formArchitecture.properties;
            }
          }
        }
      },

      /*Show delete element modal*/
      delElemModal(elem, button){
        this.modalDeletElement.title = "Delete Element";
        this.modalDeletElement.element = elem;
        this.$root.$emit('bv::show::modal', 'modalDeletElement', button);
      },

      /*Delete the element*/
      delElement(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          for(var j=0; j < architecture.components[i].elements.length; j++){
            if(comp == architecture.components[i].elements[j].name){
              architecture.components[i].elements.splice(j,1);
            }
          }
        }
      },

      /*Empty form*/
      emptyFormArch(){
        this.formArchitecture.name = '';
        this.formArchitecture.id = '';
        this.formArchitecture.type = '';
        this.formArchitecture.defValue = '';
        this.formArchitecture.properties = [];
        this.formArchitecture.precision = '';
      },

      /*Show reset instructions modal*/
      resetInstModal(elem, button){
        this.modalResetInst.title = "Reset " + elem + " instructions";
        this.modalResetInst.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetInst', button);
      },

      /*Reset instructions*/
      resetInstructions(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++){
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = register_value_deserialize(auxArch);

            architecture.instructions = auxArchitecture.instructions;
            app._data.architecture = architecture;

            hide_loading();
            show_notification('The instruction set has been reset correctly', 'success') ;

            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = register_value_deserialize(auxArchitecture);
          architecture.instructions = auxArchitecture2.instructions;

          app._data.architecture = architecture;

          hide_loading();
          show_notification('The instruction set has been reset correctly', 'success') ;
        });
      },

      /*Verify new number of fields*/
      changeNumfield(type){
        if(type == 0){
          if(this.formInstruction.numfields > (this.formInstruction.nwords * 32)){
            this.formInstruction.numfieldsAux = (this.formInstruction.nwords * 32);
            this.formInstruction.numfields = (this.formInstruction.nwords * 32);
          }
          else if(this.formInstruction.numfields < 1){
            this.formInstruction.numfieldsAux = 1;
            this.formInstruction.numfields = 1;
          }
          else{
            this.formInstruction.numfieldsAux = this.formInstruction.numfields;
          }
        }
        if(type == 1){
          if(this.formPseudoinstruction.numfields > (this.formPseudoinstruction.nwords * 32)){
            this.formPseudoinstruction.numfieldsAux = (this.formPseudoinstruction.nwords * 32);
            this.formPseudoinstruction.numfields = (this.formPseudoinstruction.nwords * 32);
          }
          else if(this.formPseudoinstruction.numfields < 0){
            this.formPseudoinstruction.numfieldsAux = 0;
            this.formPseudoinstruction.numfields = 0;
          }
          else{
            this.formPseudoinstruction.numfieldsAux = this.formPseudoinstruction.numfields;
          }
        }
      },

      /*Show instruction fields modal*/
      viewFielsInst(elem, co, cop, button){
        this.modalViewFields.title = "Fields of " + elem;
        this.modalViewFields.element = elem;
        for (var i = 0; i < architecture.instructions.length; i++){
          if(elem == architecture.instructions[i].name && co == architecture.instructions[i].co && cop == architecture.instructions[i].cop){
            this.formInstruction.name = architecture.instructions[i].name;
            this.formInstruction.cop = architecture.instructions[i].cop;
            this.formInstruction.co = architecture.instructions[i].co;
            app._data.modalViewFields.co = architecture.instructions[i].co;
            app._data.modalViewFields.cop = architecture.instructions[i].cop;
            this.formInstruction.numfields = architecture.instructions[i].fields.length;
            this.formInstruction.numfieldsAux = architecture.instructions[i].fields.length;

            for (var j = 0; j < architecture.instructions[i].fields.length; j++) {
              this.formInstruction.nameField [j]= architecture.instructions[i].fields[j].name;
              this.formInstruction.typeField[j] = architecture.instructions[i].fields[j].type;
              this.formInstruction.startBitField[j] = architecture.instructions[i].fields[j].startbit;
              this.formInstruction.stopBitField[j] = architecture.instructions[i].fields[j].stopbit;
              this.formInstruction.valueField[j] = architecture.instructions[i].fields[j].valueField;
            }
          }
        }
        this.$root.$emit('bv::show::modal', 'modalViewFields', button);
      },

      /*Verify all fields of new instructions*/
      newInstVerify(evt){
        evt.preventDefault();

        for (var i = 0; i < this.formInstruction.nameField.length; i++){
          for (var j = i + 1; j < this.formInstruction.nameField.length; j++){
            if (this.formInstruction.nameField[i] == this.formInstruction.nameField[j]){
                show_notification('Field name repeated', 'danger') ;
                return;
            }
          }
        }

        var empty = 0;
        var auxCop = "";

        for (var z = 1; z < this.formInstruction.numfields; z++){
          if(this.formInstruction.typeField[z] == 'cop'){
            if(!this.formInstruction.valueField[z]){
              empty = 1;
            }
            else{
              if((this.formInstruction.valueField[z]).length != (this.formInstruction.startBitField[z] - this.formInstruction.stopBitField[z] + 1)){
                show_notification('The length of cop should be ' + (this.formInstruction.startBitField[z] - this.formInstruction.stopBitField[z] + 1) + ' binary numbers', 'danger') ;
                return;
              }

              for (var i = 0; i < this.formInstruction.valueField[z].length; i++){
                if (this.formInstruction.valueField[z].charAt(i) != "0" && this.formInstruction.valueField[z].charAt(i) != "1"){
                    show_notification('The value of cop must be binary', 'danger') ;
                    return;
                }
              }
              auxCop = auxCop + this.formInstruction.valueField[z];
            }
          }
        }

        this.formInstruction.cop = auxCop;

          if (typeof(this.formInstruction.co) != 'object')
            for (var i = 0; i < this.formInstruction.co.length; i++){
              if (this.formInstruction.co.charAt(i) != "0" && this.formInstruction.co.charAt(i) != "1"){
                  show_notification('The value of co must be binary', 'danger') ;
                  return;
              }
            }
        else {
            for (let val in this.formInstruction.co)
                if (!/[01]+/.test(val)) {
                  show_notification('The value of co must be binary', 'danger') ;
                  return;
                }
        }

        for (var i = 0; i < this.formInstruction.numfields; i++){
          if(this.formInstruction.nameField.length <  this.formInstruction.numfields || this.formInstruction.typeField.length <  this.formInstruction.numfields || this.formInstruction.startBitField.length <  this.formInstruction.numfields || this.formInstruction.stopBitField.length <  this.formInstruction.numfields){
            empty = 1;
          }
        }

        if (!this.formInstruction.name || !this.formInstruction.type || !this.formInstruction.co || !this.formInstruction.nwords || !this.formInstruction.numfields || !this.formInstruction.signature_definition || !this.formInstruction.definition || empty == 1) {
            show_notification('Please complete all fields', 'danger') ;
        }
        else if (typeof(this.formInstruction.co) != 'object' && isNaN(this.formInstruction.co)){
                 show_notification('The field co must be numbers', 'danger') ;
        } else if (typeof(this.formInstruction.co) === 'object' && this.formInstruction.co.some(val => isNaN(val)))
                 show_notification('The field co must be numbers', 'danger') ;
        else if(isNaN(this.formInstruction.cop)){
                 show_notification('The field cop must be numbers', 'danger') ;
        }
        else if(typeof(this.formInstruction.co) != 'object' && (this.formInstruction.co).length != (this.formInstruction.startBitField[0] - this.formInstruction.stopBitField[0] + 1)){
                 show_notification('The length of co should be ' + (this.formInstruction.startBitField[0] - this.formInstruction.stopBitField[0] + 1) + ' binary numbers', 'danger');
        } else if (typeof(this.formInstruction.co) === 'object' && this.formInstruction.co.some((val, ind) => val.length !== app.formInstruction.startBitField[0][ind] - app.formInstruction.stopBitField[0][ind] +1))
                 show_notification('The length of co don\'t match with the desription', 'danger');
        else {
          this.newInstruction();
        }
      },

      /*Create a new instruction*/
      newInstruction(){
        for (var i = 0; i < architecture.instructions.length; i++){
          if  (this.formInstruction.co == architecture.instructions[i].co){
            if  ((!this.formInstruction.cop)){
                 show_notification('The instruction already exists', 'danger') ;
                 return;
            }
          }
        }

        let auxcop = (() => this.formInstruction.co instanceof Array ? this.formInstrucion.co.join("") : this.formInstruction.co)() + this.formInstruction.cop;

        for (var i = 0; i < architecture.instructions.length; i++){
          if ((auxcop == architecture.instructions[i].cop) && (!auxcop == false)){
               show_notification('The instruction already exists', 'danger') ;
               return;
          }
        }

        this.showNewInstruction = false;

        //var cop = false;

        this.generateSignatureInst();

        var signature = this.formInstruction.signature;
        var signatureRaw = this.formInstruction.signatureRaw;

        /*if(cop == false){
          this.formInstruction.cop='';
        }*/

        var newInstruction = {
          name: this.formInstruction.name,
          type: this.formInstruction.type,
          signature_definition: this.formInstruction.signature_definition,
          signature: signature, signatureRaw: signatureRaw,
          co: this.formInstruction.co,
          cop: this.formInstruction.cop,
          nwords: this.formInstruction.nwords,
          properties: this.formInstruction.properties,
          help: this.formInstruction.help,
          fields: [],
          definition: this.formInstruction.definition,
          separated:[]
        };
        newInstruction.separated = this.formInstruction.startBitField.map((e, i) => this.formInstruction.separated[i] || false)
        architecture.instructions.push(newInstruction);
        for (var i = 0; i < this.formInstruction.numfields; i++){
          var newField = { name: this.formInstruction.nameField[i], type: this.formInstruction.typeField[i],
                           startbit: !this.formInstruction.separated[i] ? parseInt(this.formInstruction.startBitField[i]) : this.formInstruction.startBitField[i].map(val => parseInt(val)),
                           stopbit: !this.formInstruction.separated[i] ? parseInt(this.formInstruction.stopBitField[i]) : this.formInstruction.stopBitField[i].map(val => parseInt(val)),
                           valueField: this.formInstruction.valueField[i]
                        };
          architecture.instructions[architecture.instructions.length-1].fields.push(newField);
        }
      },

      /*Show edit instruction modal*/
      editInstModal(elem, co, cop, button){
        this.modalEditInst.title = "Edit Instruction";
        this.modalEditInst.element = elem;
        for (var i = 0; i < architecture.instructions.length; i++) {
          if(elem == architecture.instructions[i].name && co == architecture.instructions[i].co && cop == architecture.instructions[i].cop){
            this.formInstruction.name = architecture.instructions[i].name;
            this.formInstruction.type = architecture.instructions[i].type;
            this.formInstruction.cop = architecture.instructions[i].cop;
            this.formInstruction.co = architecture.instructions[i].co;
            app._data.modalEditInst.co = architecture.instructions[i].co;
            app._data.modalEditInst.cop = architecture.instructions[i].cop;
            this.formInstruction.nwords = architecture.instructions[i].nwords;
            this.formInstruction.numfields = architecture.instructions[i].fields.length;
            this.formInstruction.numfieldsAux = architecture.instructions[i].fields.length;
            this.formInstruction.signature_definition= architecture.instructions[i].signature_definition;
            this.formInstruction.definition = architecture.instructions[i].definition;
            this.formInstruction.help = architecture.instructions[i].help;
            this.formInstruction.separated = [];
            this.formInstruction.properties = architecture.instructions[i].properties;

            for (var j = 0; j < architecture.instructions[i].fields.length; j++) {
              this.formInstruction.nameField [j]= architecture.instructions[i].fields[j].name;
              this.formInstruction.typeField[j] = architecture.instructions[i].fields[j].type;
              //this.formInstruction.startBitField[j] = architecture.instructions[i].fields[j].startbit;
              //this.formInstruction.stopBitField[j] = architecture.instructions[i].fields[j].stopbit;
              if (typeof(architecture.instructions[i].separated) === 'undefined' || !architecture.instructions[i].separated[j]) {
                this.formInstruction.startBitField[j] = architecture.instructions[i].fields[j].startbit;
                this.formInstruction.stopBitField[j] = architecture.instructions[i].fields[j].stopbit;
                this.formInstruction.separated.push(false);
              }
              else {
                this.formInstruction.startBitField[j] = [...architecture.instructions[i].fields[j].startbit];
                this.formInstruction.stopBitField[j] =  [...architecture.instructions[i].fields[j].stopbit];
                this.formInstruction.separated.push(true);
              }
              this.formInstruction.valueField[j] = architecture.instructions[i].fields[j].valueField;
            }
            this.generateSignatureInst();
            break;
          }
        }
        this.$root.$emit('bv::show::modal', 'modalEditInst', button);
      },

      /*Check all fields of modify instruction*/
      editInstVerify(evt, inst, co, cop){
        evt.preventDefault();

        for (var i = 0; i < this.formInstruction.nameField.length; i++){
          for (var j = i + 1; j < this.formInstruction.nameField.length; j++){
            if (this.formInstruction.nameField[i] == this.formInstruction.nameField[j]){
              show_notification('Field name repeated', 'danger') ;
              return;
            }
          }
        }

        var empty = 0;
        var auxCop = "";

        for (var z = 1; z < this.formInstruction.numfields; z++){
          if (this.formInstruction.typeField[z] == 'cop'){
            if (!this.formInstruction.valueField[z]){
                empty = 1;
            }
            else {
              if ((this.formInstruction.valueField[z]).length != (this.formInstruction.startBitField[z] - this.formInstruction.stopBitField[z] + 1)){
                 show_notification('The length of cop should be ' + (this.formInstruction.startBitField[z] - this.formInstruction.stopBitField[z] + 1) + ' binary numbers', 'danger') ;
                 return;
              }

              for (var i = 0; i < this.formInstruction.valueField[z].length; i++){
                if (this.formInstruction.valueField[z].charAt(i) != "0" && this.formInstruction.valueField[z].charAt(i) != "1"){
                   show_notification('The value of cop must be binary', 'danger') ;
                   return;
                }
              }
            }
            auxCop = auxCop + this.formInstruction.valueField[z];
          }
        }

        this.formInstruction.cop = auxCop;

          if (typeof(this.formInstruction.co) !== 'object')
            for (var i = 0; i < this.formInstruction.co.length; i++){
              if (this.formInstruction.co.charAt(i) != "0" && this.formInstruction.co.charAt(i) != "1"){
                  show_notification('The value of co must be binary', 'danger') ;
                  return;
              }
            }
          else {
              for (let val in this.formInstruction.co) {
                  if (!/^[01]+$/.test(val)) {
                      show_notification('The value of co must be binary', 'danger') ;
                      return;
                  }
              }
          }

        for (var i = 0; i < this.formInstruction.numfields; i++){
          if(!this.formInstruction.nameField[i] || !this.formInstruction.typeField[i] || (!this.formInstruction.startBitField[i] && this.formInstruction.startBitField[i] != 0) || (!this.formInstruction.stopBitField[i] && this.formInstruction.stopBitField[i] != 0)){
            empty = 1;
          }
        }
        if (!this.formInstruction.name || !this.formInstruction.type || !this.formInstruction.co || !this.formInstruction.nwords || !this.formInstruction.numfields || !this.formInstruction.signature_definition || !this.formInstruction.definition || empty == 1) {
          show_notification('Please complete all fields', 'danger') ;
        }
        if ((typeof(this.formInstruction.co) != 'object' && isNaN(this.formInstruction.co)) || (typeof(this.formInstruction.co) === 'object' && this.formInstruction.co.some(val => isNaN(val))))
                 show_notification('The field co must be numbers', 'danger') ;
        else if(isNaN(this.formInstruction.cop)){
          show_notification('The field cop must be numbers', 'danger') ;
        }
        else if(typeof(this.formInstruction.co) != 'object' && (this.formInstruction.co).length != (this.formInstruction.startBitField[0] - this.formInstruction.stopBitField[0] + 1)){
                 show_notification('The length of co should be ' + (this.formInstruction.startBitField[0] - this.formInstruction.stopBitField[0] + 1) + ' binary numbers', 'danger');
        } else if (typeof(this.formInstruction.co) === 'object' && this.formInstruction.co.some((val, ind) => val.length !== app.formInstruction.startBitField[0][ind] - app.formInstruction.stopBitField[0][ind] +1))
                 show_notification('The length of co don\'t match with the desription', 'danger');
        else {
          this.editInstruction(inst, co, cop);
        }
      },

      /*Edit the instruction*/
      editInstruction(comp, co, cop)
      {
        var exCop = false;

        for (var z = 1; z < this.formInstruction.numfields; z++){
          if (this.formInstruction.typeField[z] == 'cop'){
              exCop = true;
          }
        }

        for (var i = 0; i < architecture.instructions.length; i++){
          if ((this.formInstruction.co == architecture.instructions[i].co) && (this.formInstruction.co != co) && (exCop == false)){
            if (((!this.formInstruction.cop) || (exCop != true))){
                show_notification('The instruction already exists', 'danger') ;
                return;
            }
          }
        }


        let auxcop = (() => this.formInstruction.co instanceof Array ? this.formInstrucion.co.join("") : this.formInstruction.co)() + this.formInstruction.cop;

        for (var i = 0; i < architecture.instructions.length && exCop == true ; i++){
          if ((auxcop == architecture.instructions[i].cop) && (!auxcop == false) && (auxcop != cop)){
               show_notification('The instruction already exists', 'danger') ;
               return;
          }
        }

        this.showEditInstruction = false;

        for (var i = 0; i < architecture.instructions.length; i++){
          if (architecture.instructions[i].name == comp && architecture.instructions[i].co == co && architecture.instructions[i].cop == cop) {
            architecture.instructions[i].name = this.formInstruction.name;
            architecture.instructions[i].type = this.formInstruction.type;
            architecture.instructions[i].co = this.formInstruction.co;
            architecture.instructions[i].cop = this.formInstruction.cop;
            architecture.instructions[i].nwords = this.formInstruction.nwords;
            architecture.instructions[i].help = this.formInstruction.help;
            architecture.instructions[i].signature_definition = this.formInstruction.signature_definition;
            architecture.instructions[i].definition = this.formInstruction.definition;
            architecture.instructions[i].properties = this.formInstruction.properties;
            if (!architecture.instructions[i].separated)
                architecture.instructions[i].separated =Array(this.formInstruction.numfields).fill(false);

            for (var j = 0; j < this.formInstruction.numfields; j++) {
              if (j < architecture.instructions[i].fields.length) {
                architecture.instructions[i].fields[j].name = this.formInstruction.nameField[j];
                architecture.instructions[i].fields[j].type = this.formInstruction.typeField[j];
                architecture.instructions[i].fields[j].startbit = !this.formInstruction.separated[j] ? parseInt(this.formInstruction.startBitField[j]) : this.formInstruction.startBitField[j].map(val => parseInt(val));
                architecture.instructions[i].fields[j].stopbit = !this.formInstruction.separated[j] ? parseInt(this.formInstruction.stopBitField[j]): this.formInstruction.stopBitField[j].map(val => parseInt(val));
                architecture.instructions[i].fields[j].valueField = this.formInstruction.valueField[j];
                /*add data to store if the field is fragmented or not.*/
                architecture.instructions[i].separated[j] = this.formInstruction.separated[j];
              }
              else{
                var newField = {name: this.formInstruction.nameField[j], type: this.formInstruction.typeField[j], startbit: this.formInstruction.startBitField[j], stopbit: this.formInstruction.stopBitField[j], valueField: this.formInstruction.valueField[j]};
                architecture.instructions[i].fields.push(newField);
              }
            }

            this.generateSignatureInst();

            var signature = this.formInstruction.signature;
            var signatureRaw = this.formInstruction.signatureRaw;

            if(exCop == false){
              architecture.instructions[i].cop='';
            }

            architecture.instructions[i].signature = signature;
            architecture.instructions[i].signatureRaw = signatureRaw;

            if(architecture.instructions[i].fields.length > this.formInstruction.numfields){
              architecture.instructions[i].fields.splice(this.formInstruction.numfields, (architecture.instructions[i].fields.length - this.formInstruction.numfields));
            }
            break;
          }
        }

        show_notification('The instruction has been modified, please check the definition of the pseudoinstructions', 'info') ;
      },

      /*Show delete instruction modal*/
      delInstModal(elem, index, button){
        this.modalDeletInst.title = "Delete Instruction";
        this.modalDeletInst.element = elem;
        this.modalDeletInst.index = index;
        this.$root.$emit('bv::show::modal', 'modalDeletInst', button);
      },

      /*Delete the instruction*/
      delInstruction(index){
        architecture.instructions.splice(index,1);
      },

      /*Generate the instruction signature*/
      generateSignatureInst(){
        var signature = this.formInstruction.signature_definition;

        var re = new RegExp("^ +");
        this.formInstruction.signature_definition= this.formInstruction.signature_definition.replace(re, "");

        re = new RegExp(" +", "g");
        this.formInstruction.signature_definition = this.formInstruction.signature_definition.replace(re, " ");

        re = new RegExp("^ +");
        signature= signature.replace(re, "");

        re = new RegExp(" +", "g");
        signature = signature.replace(re, " ");

        for (var z = 0; z < this.formInstruction.numfields; z++){
          re = new RegExp("[Ff]"+z, "g");

          if(z == 0){
            signature = signature.replace(re, this.formInstruction.name);
          }
          else{
            signature = signature.replace(re, this.formInstruction.typeField[z]);
          }
        }

        re = new RegExp(" ", "g");
        signature = signature.replace(re , ",");

        var signatureRaw = this.formInstruction.signature_definition;

        re = new RegExp("^ +");
        signatureRaw= signatureRaw.replace(re, "");

        re = new RegExp(" +", "g");
        signatureRaw = signatureRaw.replace(re, " ");

        for (var z = 0; z < this.formInstruction.numfields; z++){
          re = new RegExp("[Ff]"+z, "g");
          signatureRaw = signatureRaw.replace(re, this.formInstruction.nameField[z]);
        }

        this.formInstruction.signature = signature;
        this.formInstruction.signatureRaw = signatureRaw;
      },

      /*Empty instruction form*/
      emptyFormInst(){
        this.formInstruction.name = '';
        this.formInstruction.type = '';
        this.formInstruction.co = '';
        this.formInstruction.cop = '';
        this.formInstruction.nwords = 1;
        this.formInstruction.numfields = "1";
        this.formInstruction.numfieldsAux = "1";
        this.formInstruction.nameField = [];
        this.formInstruction.properties = [];
        this.formInstruction.typeField = [];
        this.formInstruction.startBitField = [];
        this.formInstruction.stopBitField = [];
        this.formInstruction.valueField = [];
        this.formInstruction.separated = [];
        this.formInstruction.assignedCop = false;
        this.formInstruction.signature ='';
        this.formInstruction.signatureRaw = '';
        this.formInstruction.signature_definition = '';
        this.formInstruction.definition = '';
        this.instructionFormPage = 1;
        this.formInstruction.help = '';
      },

      /*Show pseudoinstruction fields modal*/
      viewFielsPseudo(elem, index, button){
        this.modalViewFields.title = "Fields of " + elem;
        this.modalViewFields.element = elem;

        this.formPseudoinstruction.name = architecture.pseudoinstructions[index].name;
        this.formPseudoinstruction.numfields = architecture.pseudoinstructions[index].fields.length;
        this.formPseudoinstruction.numfieldsAux = architecture.pseudoinstructions[index].fields.length;

        for (var j = 0; j < architecture.pseudoinstructions[index].fields.length; j++){
          this.formPseudoinstruction.nameField[j] = architecture.pseudoinstructions[index].fields[j].name;
          this.formPseudoinstruction.typeField[j] = architecture.pseudoinstructions[index].fields[j].type;
          this.formPseudoinstruction.startBitField[j] = architecture.pseudoinstructions[index].fields[j].startbit;
          this.formPseudoinstruction.stopBitField[j] = architecture.pseudoinstructions[index].fields[j].stopbit;
        }

        this.$root.$emit('bv::show::modal', 'modalViewPseudoFields', button);
      },

      /*Show reset pseudoinstructions modal*/
      resetPseudoinstModal(elem, button){
        this.modalResetPseudoinst.title = "Reset " + elem + " pseudoinstructions";
        this.modalResetPseudoinst.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetPseudoinst', button);
      },

      /*Reset pseudoinstructions*/
      resetPseudoinstructionsModal(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++) {
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = register_value_deserialize(auxArch);

            architecture.pseudoinstructions = auxArchitecture.pseudoinstructions;
            app._data.architecture = architecture;

            hide_loading();
            show_notification('The registers has been reset correctly', 'success') ;

            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = register_value_deserialize(auxArchitecture);
          architecture.pseudoinstructions = auxArchitecture2.pseudoinstructions;

          app._data.architecture = architecture;

          hide_loading();
          show_notification('The pseudoinstruction set has been reset correctly', 'success') ;
        });
      },

      /*Check all fields of new pseudoinstruction*/
      newPseudoinstVerify(evt){
        evt.preventDefault();

        for (var i = 0; i < this.formPseudoinstruction.nameField.length; i++){
          for (var j = i + 1; j < this.formPseudoinstruction.nameField.length; j++){
            if (this.formPseudoinstruction.nameField[i] == this.formPseudoinstruction.nameField[j]){
              show_notification('Field name repeated', 'danger') ;
              return;
            }
          }
        }

        var vacio = 0;

        for (var i = 0; i < this.formPseudoinstruction.numfields; i++) {
          if(this.formPseudoinstruction.nameField.length <  this.formPseudoinstruction.numfields || this.formPseudoinstruction.typeField.length <  this.formPseudoinstruction.numfields || this.formPseudoinstruction.startBitField.length <  this.formPseudoinstruction.numfields || this.formPseudoinstruction.stopBitField.length <  this.formPseudoinstruction.numfields){
            vacio = 1;
          }
        }

        var result = this.pseudoDefValidator(this.formPseudoinstruction.name, this.formPseudoinstruction.definition, this.formPseudoinstruction.nameField);

        if(result == -1){
          return;
        }

        if (!this.formPseudoinstruction.name || !this.formPseudoinstruction.nwords || !this.formPseudoinstruction.numfields || !this.formPseudoinstruction.signature_definition || !this.formPseudoinstruction.definition || vacio == 1) {
          show_notification('Please complete all fields', 'danger') ;
        }
        else {
          this.newPseudoinstruction();
        }
      },

      /*Create a new pseudoinstruction*/
      newPseudoinstruction(){
        this.showNewPseudoinstruction = false;

        this.generateSignaturePseudo();

        var signature = this.formPseudoinstruction.signature;
        var signatureRaw = this.formPseudoinstruction.signatureRaw;

        var newPseudoinstruction = {name: this.formPseudoinstruction.name, signature_definition: this.formPseudoinstruction.signature_definition, signature: signature, signatureRaw: signatureRaw, nwords: this.formPseudoinstruction.nwords , fields: [], definition: this.formPseudoinstruction.definition, help: this.formPseudoinstruction.help};
        architecture.pseudoinstructions.push(newPseudoinstruction);

        for (var i = 0; i < this.formPseudoinstruction.numfields; i++) {
          var newField = {name: this.formPseudoinstruction.nameField[i], type: this.formPseudoinstruction.typeField[i], startbit: this.formPseudoinstruction.startBitField[i], stopbit: this.formPseudoinstruction.stopBitField[i]};
          architecture.pseudoinstructions[architecture.pseudoinstructions.length-1].fields.push(newField);
        }
      },

      /*Show edit pseudoinstruction modal*/
      editPseudoinstModal(elem, index, button){
        this.modalEditPseudoinst.title = "Edit Pseudoinstruction";
        this.modalEditPseudoinst.element = elem;
        this.modalEditPseudoinst.index = index;

        this.formPseudoinstruction.name = architecture.pseudoinstructions[index].name;
        this.formPseudoinstruction.nwords = architecture.pseudoinstructions[index].nwords;
        this.formPseudoinstruction.numfields = architecture.pseudoinstructions[index].fields.length;
        this.formPseudoinstruction.numfieldsAux = architecture.pseudoinstructions[index].fields.length;
        this.formPseudoinstruction.signature_definition = architecture.pseudoinstructions[index].signature_definition;
        this.formPseudoinstruction.definition = architecture.pseudoinstructions[index].definition;
        this.formPseudoinstruction.help = architecture.pseudoinstructions[index].help;

        for (var j = 0; j < architecture.pseudoinstructions[index].fields.length; j++) {
          this.formPseudoinstruction.nameField[j] = architecture.pseudoinstructions[index].fields[j].name;
          this.formPseudoinstruction.typeField[j] = architecture.pseudoinstructions[index].fields[j].type;
          this.formPseudoinstruction.startBitField[j] = architecture.pseudoinstructions[index].fields[j].startbit;
          this.formPseudoinstruction.stopBitField[j] = architecture.pseudoinstructions[index].fields[j].stopbit;
        }

        this.generateSignaturePseudo();

        this.$root.$emit('bv::show::modal', 'modalEditPseudoinst', button);
      },

      /*Check all fields of modify pseudoinstruction*/
      editPseudoinstVerify(evt, inst, index){
        evt.preventDefault();

        for (var i = 0; i < this.formPseudoinstruction.nameField.length; i++){
          for (var j = i + 1; j < this.formPseudoinstruction.nameField.length; j++){
            if (this.formPseudoinstruction.nameField[i] == this.formPseudoinstruction.nameField[j]){
              show_notification('Field name repeated', 'danger') ;
              return;
            }
          }
        }

        var vacio = 0;

        for (var i = 0; i < this.formPseudoinstruction.numfields; i++) {
          if(!this.formPseudoinstruction.nameField[i] || !this.formPseudoinstruction.typeField[i] || (!this.formPseudoinstruction.startBitField[i] && this.formPseudoinstruction.startBitField[i] != 0) || (!this.formPseudoinstruction.stopBitField[i] && this.formPseudoinstruction.stopBitField[i] != 0)){
            vacio = 1;
          }
        }

        var result = this.pseudoDefValidator(inst, this.formPseudoinstruction.definition, this.formPseudoinstruction.nameField);

        if(result == -1){
          return;
        }

        if (!this.formPseudoinstruction.name || !this.formPseudoinstruction.nwords || !this.formPseudoinstruction.numfields || !this.formPseudoinstruction.signature_definition || !this.formPseudoinstruction.definition || vacio == 1) {
          show_notification('Please complete all fields', 'danger') ;
        }
        else {
          this.editPseudoinstruction(inst, index);
        }
      },

      /*Edit the pseudoinstruction*/
      editPseudoinstruction(comp, index){

        this.showEditPseudoinstruction = false;

        architecture.pseudoinstructions[index].name = this.formPseudoinstruction.name;
        architecture.pseudoinstructions[index].nwords = this.formPseudoinstruction.nwords;
        architecture.pseudoinstructions[index].definition = this.formPseudoinstruction.definition;
        architecture.pseudoinstructions[index].signature_definition = this.formPseudoinstruction.signature_definition;
        architecture.pseudoinstructions[index].help = this.formPseudoinstruction.help;

        for (var j = 0; j < this.formPseudoinstruction.numfields; j++){
          if(j < architecture.pseudoinstructions[index].fields.length){
            architecture.pseudoinstructions[index].fields[j].name = this.formPseudoinstruction.nameField[j];
            architecture.pseudoinstructions[index].fields[j].type = this.formPseudoinstruction.typeField[j];
            architecture.pseudoinstructions[index].fields[j].startbit = this.formPseudoinstruction.startBitField[j];
            architecture.pseudoinstructions[index].fields[j].stopbit = this.formPseudoinstruction.stopBitField[j];
          }
          else{
            var newField = {name: this.formPseudoinstruction.nameField[j], type: this.formPseudoinstruction.typeField[j], startbit: this.formPseudoinstruction.startBitField[j], stopbit: this.formPseudoinstruction.stopBitField[j]};
            architecture.pseudoinstructions[index].fields.push(newField);
          }
        }

        this.generateSignaturePseudo();

        var signature = this.formPseudoinstruction.signature;
        var signatureRaw = this.formPseudoinstruction.signatureRaw;

        architecture.pseudoinstructions[index].signature = signature;
        architecture.pseudoinstructions[index].signatureRaw = signatureRaw;

        if(architecture.pseudoinstructions[index].fields.length > this.formPseudoinstruction.numfields){
          architecture.pseudoinstructions[index].fields.splice(this.formPseudoinstruction.numfields, (architecture.pseudoinstructions[i].fields.length - this.formPseudoinstruction.numfields));
        }
      },

      /*Show delete pseudoinstruction modal*/
      delPseudoinstModal(elem, index, button){
        this.modalDeletPseudoinst.title = "Delete Pseudointruction";
        this.modalDeletPseudoinst.element = elem;
        this.modalDeletPseudoinst.index = index;
        this.$root.$emit('bv::show::modal', 'modalDeletPseudoinst', button);
      },

      /*Delete the pseudoinstruction*/
      delPseudoinstruction(index){
        architecture.pseudoinstructions.splice(index,1);
      },

      /*Verify the pseudoinstruction definition*/
      pseudoDefValidator(name, definition, fields){
        var re = new RegExp("^\n+");
        definition = definition.replace(re, "");

        re = new RegExp("\n+", "g");
        definition = definition.replace(re, "");

        var newDefinition = definition;

        re = /{([^}]*)}/g;

        var code = re.exec(definition);

        if(code != null)
	{
          while(code != null)
	  {
            console_log(code)
            var instructions = code[1].split(";");
            if (instructions.length == 1){
                show_notification('Enter a ";" at the end of each line of code', 'danger') ;
                return -1;
            }

            for (var j = 0; j < instructions.length-1; j++){
              var re = new RegExp("^ +");
              instructions[j] = instructions[j].replace(re, "");

              re = new RegExp(" +", "g");
              instructions[j] = instructions[j].replace(re, " ");

              var instructionParts = instructions[j].split(" ");

              var found = false;
              for (var i = 0; i < architecture.instructions.length; i++){
                if(architecture.instructions[i].name == instructionParts[0]){
                  found = true;
                  var numFields = 0;
                  var regId = 0;

                  signatureDef = architecture.instructions[i].signature_definition;
                  signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                  re = new RegExp("[fF][0-9]+", "g");
                  signatureDef = signatureDef.replace(re, "(.*?)");

                  console_log(instructions[j])

                  re = new RegExp(signatureDef+"$");
                  if(instructions[j].search(re) == -1){
                    show_notification('Incorrect signature --> ' + architecture.instructions[i].signatureRaw, 'danger') ;
                    return -1;
                  }

                  re = new RegExp(signatureDef+"$");
                  var match = re.exec(instructions[j]);
                  var instructionParts = [];
                  for(var z = 1; z < match.length; z++){
                    instructionParts.push(match[z]);
                  }

                  re = new RegExp(",", "g");
                  var signature = architecture.instructions[i].signature.replace(re, " ");

                  re = new RegExp(signatureDef+"$");
                  var match = re.exec(signature);
                  var signatureParts = [];
                  for(var j = 1; j < match.length; j++){
                    signatureParts.push(match[j]);
                  }

                  console_log(instructionParts)
                  console_log(signatureParts)

                  for (var z = 1; z < signatureParts.length; z++){

                    if(signatureParts[z] == "INT-Reg" || signatureParts[z] == "SFP-Reg" || signatureParts[z] == "DFP-Reg" ||signatureParts[z] == "Ctrl-Reg"){
                      console_log("REG")
                      var found = false;

                      var id = -1;
                      re = new RegExp("R[0-9]+");
                      console_log(z)
                      if(instructionParts[z].search(re) != -1){
                        re = new RegExp("R(.*?)$");
                        match = re.exec(instructionParts[z]);
                        id = match[1];
                      }

                      for (var a = 0; a < architecture.components.length; a++){
                        for (var b = 0; b < architecture.components[a].elements.length; b++){
                          if(architecture.components[a].elements[b].name == instructionParts[z]){
                            found = true;
                          }
                          if(architecture.components[a].type == "integer" && regId == id){
                            found = true;
                          }
                          if(architecture.components[a].type == "integer"){
                            regId++;
                          }
                        }
                      }

                      for (var b = 0; b < fields.length; b++){
                        if(fields[b] == instructionParts[z]){
                          found = true;
                        }
                      }

                      if(!found){
                        show_notification('Register ' + instructionParts[z] + ' not found', 'danger') ;
                        return -1;
                      }
                    }

                    if(signatureParts[z] == "inm-signed" || signatureParts[z] == "inm-unsigned" || signatureParts[z] == "offset_bytes" || signatureParts[z] == "offset_words"){
                      var fieldsLength = architecture.instructions[i].fields[z].startbit - architecture.instructions[i].fields[z].stopbit + 1;
                      if(instructionParts[z].match(/^0x/)){
                        var value = instructionParts[z].split("x");
                        if (isNaN(parseInt(instructionParts[z], 16)) == true){
                            show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                            return -1;
                        }

                        if(value[1].length*4 > fieldsLength){
                          show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        }
                      }
                      else if (instructionParts[z].match(/^(\d)+\.(\d)+/)){
                        if(isNaN(parseFloat(instructionParts[z])) == true){
                          show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                          return -1;
                        }

                        if(this.float2bin(parseFloat(instructionParts[z])).length > fieldsLength){
                          show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        }
                      }
                      else if(isNaN(parseInt(instructionParts[z]))){

                      }
                      else {
                        var numAux = parseInt(instructionParts[z], 10);
                        if(isNaN(parseInt(instructionParts[z])) == true){
                          show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                          return -1;
                        }

                        /*if((numAux.toString(2)).length > fieldsLength){
                          show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        }*/

                        var comNumPos = Math.pow(2, fieldsLength-1);
                        var comNumNeg = comNumPos * (-1);
                        comNumPos = comNumPos -1;

                        console_log(comNumPos);
                        console_log(comNumNeg);

                        if(parseInt(instructionParts[z], 10) > comNumPos || parseInt(instructionParts[z], 10) < comNumNeg){
                          show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        }
                      }
                    }

                    if(signatureParts[z] == "address"){
                      var fieldsLength = architecture.instructions[i].fields[z].startbit - architecture.instructions[i].fields[z].stopbit + 1;
                      if(instructionParts[z].match(/^0x/)){
                        var value = instructionParts[z].split("x");
                        if(isNaN(parseInt(instructionParts[z], 16)) == true){
                          show_notification("Address " + instructionParts[z] + " is not valid", 'danger') ;
                          return -1;
                        }

                        if(value[1].length*4 > fieldsLength){
                          show_notification("Address " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        }
                      }
                    }

                    if(!found){
                      show_notification('Register ' + instructionParts[z] + ' not found', 'danger') ;
                      return -1;
                    }
                  }
                }
              }
              if(!found){
                show_notification('Instruction ' + instructions[j] + ' do not exists', 'danger') ;
                return -1;
              }
            }

            definition = definition.replace(code[0], "");

            re = /{([^}]*)}/g;
            code = re.exec(definition);
          }
        }
        else{
          var instructions = definition.split(";");
          console_log(instructions.length)
          if(instructions.length == 1){
            show_notification('Enter a ";" at the end of each line of code', 'danger') ;
            return -1;
          }

          for (var j = 0; j < instructions.length-1; j++){
            var re = new RegExp("^ +");
            instructions[j] = instructions[j].replace(re, "");

            re = new RegExp(" +", "g");
            instructions[j] = instructions[j].replace(re, " ");

            var instructionParts = instructions[j].split(" ");

            var found = false;
            for (var i = 0; i < architecture.instructions.length; i++){
              if(architecture.instructions[i].name == instructionParts[0]){
                found = true;
                var numFields = 0;
                var regId = 0;

                signatureDef = architecture.instructions[i].signature_definition;
                signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                re = new RegExp("[fF][0-9]+", "g");
                signatureDef = signatureDef.replace(re, "(.*?)");

                console_log(instructions[j])

                re = new RegExp(signatureDef+"$");
                if(instructions[j].search(re) == -1){
                  show_notification('Incorrect signature --> ' + architecture.instructions[i].signatureRaw, 'danger') ;
                  return -1;
                }

                re = new RegExp(signatureDef+"$");
                var match = re.exec(instructions[j]);
                var instructionParts = [];
                for(var z = 1; z < match.length; z++){
                  instructionParts.push(match[z]);
                }

                re = new RegExp(",", "g");
                var signature = architecture.instructions[i].signature.replace(re, " ");

                re = new RegExp(signatureDef+"$");
                var match = re.exec(signature);
                var signatureParts = [];
                for(var j = 1; j < match.length; j++){
                  signatureParts.push(match[j]);
                }

                console_log(instructionParts)
                console_log(signatureParts)

                for (var z = 1; z < signatureParts.length; z++){

                  if(signatureParts[z] == "INT-Reg" || signatureParts[z] == "SFP-Reg" || signatureParts[z] == "DFP-Reg" ||signatureParts[z] == "Ctrl-Reg"){
                    console_log("REG")
                    var found = false;

                    var id = -1;
                    re = new RegExp("R[0-9]+");
                    console_log(z)
                    if(instructionParts[z].search(re) != -1){
                      re = new RegExp("R(.*?)$");
                      match = re.exec(instructionParts[z]);
                      id = match[1];
                    }

                    for (var a = 0; a < architecture.components.length; a++){
                      for (var b = 0; b < architecture.components[a].elements.length; b++){
                        if(architecture.components[a].elements[b].name == instructionParts[z]){
                          found = true;
                        }
                        if(architecture.components[a].type == "integer" && regId == id){
                          found = true;
                        }
                        if(architecture.components[a].type == "integer"){
                          regId++;
                        }
                      }
                    }

                    for (var b = 0; b < fields.length; b++){
                      if(fields[b] == instructionParts[z]){
                        found = true;
                      }
                    }

                    if(!found){
                      show_notification('Register ' + instructionParts[z] + ' not found', 'danger') ;
                      return -1;
                    }
                  }

                  if(signatureParts[z] == "inm-signed" || signatureParts[z] == "inm-unsigned" || signatureParts[z] == "offset_bytes" || signatureParts[z] == "offset_words"){
                    var fieldsLength = architecture.instructions[i].fields[z].startbit - architecture.instructions[i].fields[z].stopbit + 1;
                    if(instructionParts[z].match(/^0x/)){
                      var value = instructionParts[z].split("x");
                      if(isNaN(parseInt(instructionParts[z], 16)) == true){
                        show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                        return -1;
                      }

                      if(value[1].length*4 > fieldsLength){
                        show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      }
                    }
                    else if (instructionParts[z].match(/^(\d)+\.(\d)+/)){
                      if(isNaN(parseFloat(instructionParts[z])) == true){
                        show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                        return -1;
                      }

                      if(this.float2bin(parseFloat(instructionParts[z])).length > fieldsLength){
                        show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      }
                    }
                    else if(isNaN(parseInt(instructionParts[z]))){

                    }
                    else {
                      var numAux = parseInt(instructionParts[z], 10);
                      if(isNaN(parseInt(instructionParts[z])) == true){
                        show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                        return -1;
                      }

                      /*if((numAux.toString(2)).length > fieldsLength){
                        show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      }*/

                      var comNumPos = Math.pow(2, fieldsLength-1);
                      var comNumNeg = comNumPos * (-1);
                      comNumPos = comNumPos -1;

                      console_log(comNumPos);
                      console_log(comNumNeg);

                      if(parseInt(instructionParts[z], 10) > comNumPos || parseInt(instructionParts[z], 10) < comNumNeg){
                        show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      }
                    }
                  }

                  if(signatureParts[z] == "address"){
                    var fieldsLength = architecture.instructions[i].fields[z].startbit - architecture.instructions[i].fields[z].stopbit + 1;
                    if(instructionParts[z].match(/^0x/)){
                      var value = instructionParts[z].split("x");
                      if(isNaN(parseInt(instructionParts[z], 16)) == true){
                        show_notification("Address " + instructionParts[z] + " is not valid", 'danger') ;
                        return -1;
                      }

                      if(value[1].length*4 > fieldsLength){
                        show_notification("Address " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      }
                    }
                  }

                  if(!found){
                    show_notification('Register ' + instructionParts[z] + ' not found', 'danger') ;
                    return -1;
                  }
                }
              }
            }
            if(!found){
              show_notification('Instruction ' + instructions[j] + ' do not exists', 'danger') ;
              return -1;
            }
          }
        }

        return 0;
      },

      /*Generate the pseudoinstruction signature*/
      generateSignaturePseudo(){
        var signature = this.formPseudoinstruction.signature_definition;

        var re = new RegExp("^ +");
        this.formPseudoinstruction.signature_definition = this.formPseudoinstruction.signature_definition.replace(re, "");

        re = new RegExp(" +", "g");
        this.formPseudoinstruction.signature_definition = this.formPseudoinstruction.signature_definition.replace(re, " ");

        re = new RegExp("^ +");
        signature= signature.replace(re, "");

        re = new RegExp(" +", "g");
        signature = signature.replace(re, " ");

        for (var z = 0; z < this.formPseudoinstruction.numfields; z++) {
          re = new RegExp("[Ff]"+z, "g");

          signature = signature.replace(re, this.formPseudoinstruction.typeField[z]);
        }

        re = new RegExp(" ", "g");
        signature = signature.replace(re , ",");

        var signatureRaw = this.formPseudoinstruction.signature_definition;

        re = new RegExp("^ +");
        signatureRaw= signatureRaw.replace(re, "");

        re = new RegExp(" +", "g");
        signatureRaw = signatureRaw.replace(re, " ");

        for (var z = 0; z < this.formPseudoinstruction.numfields; z++) {
          re = new RegExp("[Ff]"+z, "g");

          signatureRaw = signatureRaw.replace(re, this.formPseudoinstruction.nameField[z]);
        }

        this.formPseudoinstruction.signature = signature;
        this.formPseudoinstruction.signatureRaw = signatureRaw;
      },

      /*Empty pseudoinstruction form*/
      emptyFormPseudo(){
        this.formPseudoinstruction.name = '';
        this.formPseudoinstruction.nwords = 1;
        this.formPseudoinstruction.numfields = "0";
        this.formPseudoinstruction.numfields = "0";
        this.formPseudoinstruction.nameField = [];
        this.formPseudoinstruction.typeField = [];
        this.formPseudoinstruction.startBitField = [];
        this.formPseudoinstruction.stopBitField = [];
        this.formPseudoinstruction.signature ='';
        this.formPseudoinstruction.signatureRaw = '';
        this.formPseudoinstruction.signature_definition = '';
        this.formPseudoinstruction.definition = '';
        this.formPseudoinstruction.help = '';
        this.instructionFormPage = 1;
      },

      /*Pagination bar names*/
      linkGen (pageNum) {
        return this.instructionFormPageLink[pageNum - 1]
      },

      pageGen (pageNum) {
        return this.instructionFormPageLink[pageNum - 1].slice(1)
      },

      /*Show reset directive modal*/
      resetDirModal(elem, button){
        this.modalResetDir.title = "Reset " + elem + " directives";
        this.modalResetDir.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetDir', button);
      },

      /*Reset directives*/
      resetDirectives(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++) {
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = register_value_deserialize(auxArch);

            architecture.directives = auxArchitecture.directives;
            app._data.architecture = architecture;

            hide_loading();
            show_notification('The directive set has been reset correctly', 'success') ;
            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = register_value_deserialize(auxArchitecture);
          architecture.directives = auxArchitecture2.directives;

          app._data.architecture = architecture;

          hide_loading();
          show_notification('The directive set has been reset correctly', 'success') ;
        });
      },

      /*Verify all fields of new directive*/
      newDirVerify(evt){
        evt.preventDefault();

        if (!this.formDirective.name || !this.formDirective.action) {
          show_notification('Please complete all fields', 'danger') ;
        }
        else {
          if(isNaN(parseInt(this.formDirective.size)) && (this.formDirective.action == 'byte' || this.formDirective.action == 'half_word' || this.formDirective.action == 'word' || this.formDirective.action == 'double_word' || this.formDirective.action == 'float' || this.formDirective.action == 'double' || this.formDirective.action == 'space')){
            show_notification('Please complete all fields', 'danger') ;
          }
          else{
            this.newDirective();
          }
        }
      },

      /*Create new directive*/
      newDirective(){
        for (var i = 0; i < architecture.directives.length; i++) {
          if(this.formDirective.name == architecture.directives[i].name){
            show_notification('The directive already exists', 'danger') ;
            return;
          }
        }

        this.showNewDirective = false;
        if(this.formDirective.action != 'byte' && this.formDirective.action != 'half_word' && this.formDirective.action != 'word' && this.formDirective.action != 'double_word' && this.formDirective.action != 'float' && this.formDirective.action != 'double' && this.formDirective.action != 'space'){
          this.formDirective.size = null;
        }

        var newDir = {name: this.formDirective.name, action: this.formDirective.action, size: this.formDirective.size};
        architecture.directives.push(newDir);
      },

      /*Show edit directive modal*/
      editDirModal(elem, button){
        this.modalEditDirective.title = "Edit " + elem;
        this.modalEditDirective.element = elem;

        for (var i = 0; i < architecture.directives.length; i++){
          if(elem == architecture.directives[i].name){
            this.formDirective.name = architecture.directives[i].name;
            this.formDirective.action = architecture.directives[i].action;
            this.formDirective.size = architecture.directives[i].size;
          }
        }
        this.$root.$emit('bv::show::modal', 'modalEditDirective', button);
      },

      /*Verify all fields of modify directive*/
      editDirVerify(evt, name){
        evt.preventDefault();

        if (!this.formDirective.name || !this.formDirective.action) {
          show_notification('Please complete all fields', 'danger') ;
        }
        else {
          if(isNaN(parseInt(this.formDirective.size)) && (this.formDirective.action == 'byte' || this.formDirective.action == 'half_word' || this.formDirective.action == 'word' || this.formDirective.action == 'double_word' || this.formDirective.action == 'float' || this.formDirective.action == 'double' || this.formDirective.action == 'space')){
            show_notification('Please complete all fields', 'danger') ;
          }
          else{
            this.editDirective(name);
          }
        }
      },

      /*edit directive*/
      editDirective(name){
        for (var i = 0; i < architecture.directives.length; i++) {
          if((this.formDirective.name == architecture.directives[i].name) && (name != this.formDirective.name)){
            show_notification('The directive already exists', 'danger') ;
            return;
          }
        }

        this.showEditDirective = false;

        for (var i = 0; i < architecture.directives.length; i++) {
          if(name == architecture.directives[i].name){
            architecture.directives[i].name = this.formDirective.name;
            architecture.directives[i].action = this.formDirective.action;
            if(this.formDirective.action == 'byte' || this.formDirective.action == 'half_word' || this.formDirective.action == 'word' || this.formDirective.action == 'double_word' || this.formDirective.action == 'float' || this.formDirective.action == 'double' || this.formDirective.action == 'space'){
              architecture.directives[i].size = this.formDirective.size;
            }
            else{
              architecture.directives[i].size = null;
            }
            return;
          }
        }
      },

      /*Show delete directive modal*/
      delDirModal(elem, button){
        this.modalDeletDir.title = "Delete " + elem;
        this.modalDeletDir.element = elem;
        this.$root.$emit('bv::show::modal', 'modalDeletDir', button);
      },

      /*Delete directive*/
      delDirective(comp){
        for (var i = 0; i < architecture.directives.length; i++) {
          if(comp == architecture.directives[i].name){
            architecture.directives.splice(i,1);
          }
        }
      },

      /*Empty directive form*/
      emptyFormDirective(){
        this.formDirective.name = '';
        this.formDirective.action = '';
        this.formDirective.size = 0;
      },

      /*Form validator*/
      valid(value){
        if(parseInt(value) != 0){
          if(!value){
            return false;
          }
          else{
            return true;
          }
        }
        else{
          return true;
        }
      },

      /*Compilator*/

      /*Compile assembly code*/
      assembly_compiler(code)
      {

        show_loading();
        promise = new Promise((resolve, reject) => {

          setTimeout(function() {

            /* compile */
            if (typeof(code)!=="undefined") {
                code_assembly=code;
            }
            else{
                code_assembly = textarea_assembly_editor.getValue();
            }

            var ret = assembly_compiler() ;

            /* update/reset */
            app._data.totalStats   = 0;
            app._data.instructions = instructions;
            app._data.memory[memory_hash[1]] = memory[memory_hash[1]];
            app._data.memory[memory_hash[0]] = memory[memory_hash[0]];
            app._data.memory[memory_hash[2]] = memory[memory_hash[2]];
            tokenIndex = 0;
            app.reset(true);

            /* Save a backup in the cache memory */
            if (typeof(Storage) !== "undefined")
            {
              var auxObject = jQuery.extend(true, {}, architecture);
              var auxArchitecture = register_value_serialize(auxObject);
              var auxArch = JSON.stringify(auxArchitecture, null, 2);

              var date = new Date();
              var auxDate = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" - "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
              console_log(app._data.architecture_name);

              localStorage.setItem("arch_name", app._data.architecture_name);
              localStorage.setItem("architecture_copy", auxArch);
              localStorage.setItem("assembly_copy", code_assembly);
              localStorage.setItem("date_copy", auxDate);
            }

            // show error/warning
            hide_loading();

            switch (ret.type)
            {
               case "error":
                    app.compileError(ret.msg, ret.token, ret.line) ;
                    break;

               case "warning":
                    show_notification(ret.token, ret.bgcolor) ;
                    break;

               default:
                    show_notification('Compilation completed successfully', 'success') ;
                    break;
            }

            // end
            resolve("0");

          }, 25);
        });
      },

      /*Empty assembly textarea*/
      newAssembly(){
        textarea_assembly_editor.setValue("");
      },

      /*Load external assembly code*/
      read_assembly(e){
        show_loading();
        var file;
        var reader;
        var files = document.getElementById('assembly_file').files;

        for (var i = 0; i < files.length; i++){
          file = files[i];
          reader = new FileReader();
          reader.onloadend = onFileLoaded;
          reader.readAsBinaryString(file);
        }

        function onFileLoaded(event) {
          code_assembly = event.currentTarget.result;
        }
        hide_loading();

        /* Google Analytics */
	creator_ga('assembly', 'assebly.load', 'assebly.load');
      },

      assembly_update(){
        if(code_assembly != ""){
          textarea_assembly_editor.setValue(code_assembly);
          show_notification(' The selected program has been loaded correctly', 'success') ;
        }
        else{
          show_notification("Please select one program", 'danger');
        }
      },

      /*Save assembly code in a local file*/
      assembly_save(){
        var textToWrite = textarea_assembly_editor.getValue();
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
        var fileNameToSaveAs;

        if(this.save_assembly == ''){
          fileNameToSaveAs = "assembly.s";
        }
        else{
          fileNameToSaveAs = this.save_assembly + ".s";
        }

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "My Hidden Link";

        window.URL = window.URL || window.webkitURL;

        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();

        /* Google Analytics */
	creator_ga('assembly', 'assebly.save', 'assebly.save');
      },

      /*Load the available examples*/
      load_examples_available( set_name ) {
	     this._data.example_loaded = new Promise(function(resolve, reject) {

		$.getJSON('examples/example_set.json' + "?v=" + new Date().getTime(), function(set) {

                  // current architecture in upperCase
		  var current_architecture = app._data.architecture_name.toUpperCase() ;

                  // search for set_name in the example set 'set'
		  for (var i=0; i<set.length; i++)
		  {
			// if set_name in set[i]...
			if (set[i].id.toUpperCase() == set_name.toUpperCase())
			{
			    // if current_architecture active but not the associated with set, skip
			    if ( (current_architecture != '') &&
  				 (set[i].architecture.toUpperCase() != current_architecture) )
		            {
		                 continue ;
		            }

			    // if no current_architecture loaded then load the associated
		            if (current_architecture == '') {
				    $.getJSON('architecture/'+ set[i].architecture +'.json',
					       function(cfg) {
						  app.load_arch_select_aux(set[i].architecture,
									   cfg, false, null);
					       }) ;
			    }

			    // load the associate example list
			    $.getJSON(set[i].url, function(cfg){
				    example_available = cfg ;
				    app._data.example_available = example_available ;
				    resolve('Example list loaded.') ;
			    });

	                    return ;
			}
		  }

		  reject('Unavailable example list.') ;
		});
             }) ;
      },

      /*Save a binary in a local file*/
      library_save(){
        if(assembly_compiler() == -1){
          return;
        }
        promise.then((message) => {
          if(message == "-1"){
            return;
          }
          if(memory[memory_hash[0]].length != 0){
            show_notification('You can not enter data in a library', 'danger') ;
            return;
          }

          for (var i = 0; i < instructions_binary.length; i++){
            console_log(instructions_binary[i].Label)
            if(instructions_binary[i].Label == "main_symbol"){
              show_notification('You can not use the "main" tag in a library', 'danger') ;
              return;
            }
          }

          var aux = {instructions_binary: instructions_binary, instructions_tag: instructions_tag};

          var textToWrite = JSON.stringify(aux, null, 2);
          var textFileAsBlob = new Blob([textToWrite], { type: 'text/json' });
          var fileNameToSaveAs;

          if(this.name_binary_save == ''){
            fileNameToSaveAs = "binary.o";
          }
          else{
            fileNameToSaveAs = this.name_binary_save + ".o";
          }

          var downloadLink = document.createElement("a");
          downloadLink.download = fileNameToSaveAs;
          downloadLink.innerHTML = "My Hidden Link";

          window.URL = window.URL || window.webkitURL;

          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);

          downloadLink.click();

          show_notification('Save binary', 'success') ;
        });
      },

      /*Load binary file*/
      library_load(e){
        var file;
        var reader;
        var files = document.getElementById('binary_file').files;

        for (var i = 0; i < files.length; i++) {
          file = files[i];
          reader = new FileReader();
          reader.onloadend = onFileLoaded;
          reader.readAsBinaryString(file);
        }

        function onFileLoaded(event) {
          code_binary = event.currentTarget.result;
        }
      },

      library_update(){
        if(code_binary.length != 0){
          update_binary = JSON.parse(code_binary);
          this.update_binary = update_binary;
          $("#divAssembly").attr("class", "col-lg-10 col-sm-12");
          $("#divTags").attr("class", "col-lg-2 col-sm-12");
          $("#divTags").show();
          this.load_binary = true;
          show_notification("The selected library has been loaded correctly", 'success');
        }
        else{
          show_notification("Please select one library", 'danger');
        }
      },

      /*Remove a loaded binary*/
      removeLibrary(){
        update_binary = "";
        this.update_binary = update_binary;
        $("#divAssembly").attr("class", "col-lg-12 col-sm-12");
        $("#divTags").attr("class", "col-lg-0 col-sm-0");
        $("#divTags").hide();
        this.load_binary = false;
      },

      /*Show error message in the compilation*/
      compileError(msg, token, line)
      {
        var code_assembly_segment = code_assembly.split('\n') ;

        this.change_UI_mode('assembly');

        setTimeout(function() {
          app.$root.$emit('bv::show::modal', 'modalAssemblyError') ;

          // line 1
          app.modalAssemblyError.line1 = "" ;
          app.modalAssemblyError.code1 = "" ;
          if (line > 0) {
              app.modalAssemblyError.line1 = line ;
              app.modalAssemblyError.code1 = code_assembly_segment[line - 1] ;
          }

          // line 2
          app.modalAssemblyError.line2 = line + 1 ;
          app.modalAssemblyError.code2 = code_assembly_segment[line] ;

          // line 3
          app.modalAssemblyError.line3 = "" ;
          app.modalAssemblyError.code3 = ""  ;
          if (line < code_assembly_segment.length - 1) {
              app.modalAssemblyError.line3 = line + 2 ;
              app.modalAssemblyError.code3 = code_assembly_segment[line + 1] ;
          }

          app.modalAssemblyError.error = msg ;

        },75);
      },

      /*Simulator*/

      /*Detects the browser being used*/
      detectBrowser(){
        if(navigator.appVersion.indexOf("Mac")!=-1) {
          this.browser = "Mac";
          return;
        }

        if (navigator.userAgent.search("Chrome") >= 0) {
          this.browser = "Chrome";
        }
        else if (navigator.userAgent.search("Firefox") >= 0) {
          this.browser = "Firefox";
        }
        else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
          this.browser = "Chrome";
        }
      },

      /*Execute one instruction*/
      executeInstruction ( )
      {

      	 /* Google Analytics */
	       creator_ga('execute', 'execute.instruction', 'execute.instruction');

         var ret = executeInstruction();
         // console.log(JSON.stringify(ret,2,null));

         if (typeof ret === "undefined") {
             console.log("AQUI hemos llegado y un poema se ha encontrado...") ;
         }

         if (ret.msg != null) {
             show_notification(ret.msg, ret.type);
         }

         if (ret.draw != null)
         {
             for (var i=0; i<ret.draw.space.length; i++) {
                  instructions[ret.draw.space[i]]._rowVariant = '';
             }
             for (var i=0; i<ret.draw.success.length; i++) {
                  instructions[ret.draw.success[i]]._rowVariant = 'success';
             }
             for (var i=0; i<ret.draw.info.length; i++) {
                  instructions[ret.draw.info[i]]._rowVariant = 'info';
             }
             for (var i=0; i<ret.draw.danger.length; i++) {
                  instructions[ret.draw.danger[i]]._rowVariant = 'danger';
             }

            /*Auto-scroll*/
            if(app._data.autoscroll == true && runProgram == false){
              if(executionIndex >= 0 && (executionIndex + 4) < instructions.length){
                var id = "#inst_table__row_" + instructions[executionIndex + 4].Address;
                var rowpos = $(id).position();
                if(rowpos){
                  var pos = rowpos.top - $('.instructions_table').height();
                  $('.instructions_table').animate({scrollTop: (pos)}, 200);
                }
              }
              else if(executionIndex > 0 && (executionIndex + 4) >= instructions.length){
                $('.instructions_table').animate({scrollTop: ($('.instructions_table').height())}, 300);
              }
            }

            if(app._data.data_mode == "stats"){
              ApexCharts.exec('graphic', 'updateSeries', stats_value);
            }
            return ;
         }
      },

      /*Execute all program*/
      executeProgram ( but )
      {
        /* Google Analytics */
	      creator_ga('execute', 'execute.run', 'execute.run');

        app._data.runExecution = true;
        app._data.runExecution = false;
        runProgram=true;

        if (instructions.length == 0)
        {
            show_notification('No instructions in memory', 'danger') ;
            runProgram=false;
            return;
        }
        if (executionIndex < -1)
        {
            show_notification('The program has finished', 'danger') ;
            runProgram=false;
            return;
        }
        if (executionIndex == -1)
        {
            show_notification('The program has finished with errors', 'danger') ;
            runProgram=false;
            return;
        }

        $("#stopExecution").show();
        $("#playExecution").hide();

        this.programExecutionInst(but);
      },

      programExecutionInst(but)
      {
        for (var i=0; (i<app._data.instructionsPacked) && (executionIndex >= 0); i++)
	{
          if(mutexRead == true){
            iter1 = 1;
            $("#stopExecution").hide();
            $("#playExecution").show();
            runProgram=false;
            return;
          }
          else if(instructions[executionIndex].Break == true && iter1 == 0){
            iter1 = 1;
            $("#stopExecution").hide();
            $("#playExecution").show();
            runProgram=false;
            return;
          }
          else if(this.runExecution == true){
            app._data.runExecution = false;
            iter1 = 1;
            $("#stopExecution").hide();
            $("#playExecution").show();
            runProgram=false;
            return;
          }
          else if(but == true && i == 0){
            app._data.resetBut = false;
          }
          else if(this.resetBut == true){
            app._data.resetBut = false;

            $("#stopExecution").hide();
            $("#playExecution").show();
            runProgram=false;
            return;
          }
          else{
            this.executeInstruction();
            iter1 = 0;
          }
        }

        if(executionIndex >= 0){
          setTimeout(this.programExecutionInst, 15);
        }
        else{
          $("#stopExecution").hide();
          $("#playExecution").show();
        }
      },

      /*Stop program excution*/
      stopExecution(){
        app._data.runExecution = true;
      },

      /*Exception Notification*/
      exception(error)
      {
         show_notification("There has been an exception. Error description: '" + error, 'danger') ;
         instructions[executionIndex]._rowVariant = 'danger';
         executionIndex = -1;

         /* Google Analytics */
	 creator_ga('execute', 'execute.exception', 'execute.exception.' + error);

         return;
      },

      /* Reset execution */
      reset ( reset_graphic )
      {
      	/* Google Analytics */
        creator_ga('execute', 'execute.reset', 'execute.reset');

        show_loading();
        setTimeout(function() {

          // UI: reset I/O
          app._data.resetBut = true ;
          app._data.keyboard = "" ;
          app._data.display  = "" ;
          app._data.enter    = null ;

          // UI: reset row color...
          for (var i = 0; i < instructions.length; i++) {
               instructions[i]._rowVariant = '' ;
          }

          reset(reset_graphic) ;

          // UI: set default row color...
          for (var i = 0; i < instructions.length; i++) {
               if (instructions[i].Label == "main") {
                   instructions[i]._rowVariant = 'success' ;
               }
          }

          /*Auto-scroll*/
          if(executionIndex >= 0 && (executionIndex + 4) < instructions.length){
            var id = "#inst_table__row_" + instructions[executionIndex + 4].Address;
            var rowpos = $(id).position();
            if(rowpos){
              var pos = rowpos.top - $('.instructions_table').height();
              $('.instructions_table').animate({scrollTop: (pos)}, 200);
            }
          }
          else if(executionIndex > 0 && (executionIndex + 4) >= instructions.length){
            $('.instructions_table').animate({scrollTop: ($('.instructions_table').height())}, 300);
          }

          /*Reset graphic*/
          if(reset_graphic == true && app._data.data_mode == "stats"){
            ApexCharts.exec('graphic', 'updateSeries', stats_value);
          }

          hide_loading();

        }, 25);

      },









      /*Console mutex*/
      consoleEnter(){
        if(this.keyboard != ""){
          consoleMutex = true;
        }
      },
      /*Empty keyboard and display*/
      consoleClear(){
        this.keyboard = "";
        this.display = "";
      },








      /*Convert hexadecimal number to floating point number*/
      hex2float ( hexvalue ){
        /*var sign     = (hexvalue & 0x80000000) ? -1 : 1;
        var exponent = ((hexvalue >> 23) & 0xff) - 127;
        var mantissa = 1 + ((hexvalue & 0x7fffff) / 0x800000);

        var valuef = sign * mantissa * Math.pow(2, exponent);
        if (-127 == exponent)
          if (1 == mantissa)
            valuef = (sign == 1) ? "+0" : "-0";
          else valuef = sign * ((hexvalue & 0x7fffff) / 0x7fffff) * Math.pow(2, -126);
        if (128 == exponent)
          if (1 == mantissa)
            valuef = (sign == 1) ? "+Inf" : "-Inf";
          else valuef = NaN;

        return valuef ;*/
        var value = hexvalue.split('x');
        var value_bit = '';

        for (var i = 0; i < value[1].length; i++){
          var aux = value[1].charAt(i);
          aux = (parseInt(aux, 16)).toString(2).padStart(4, "0");
          value_bit = value_bit + aux;
        }

        var buffer = new ArrayBuffer(4);
        new Uint8Array( buffer ).set( value_bit.match(/.{8}/g).map( binaryStringToInt ) );
        return new DataView( buffer ).getFloat32(0, false);
      },

      /*Convert hexadecimal number to double floating point number*/
      hex2double ( hexvalue ){
          return hex2double(hexvalue) ;
      },

      /*Convert hexadecimal number to char*/
      hex2char8 ( hexvalue )
      {
          return hex2char8(hexvalue) ;
      },

      /*Convert floating point number to binary*/
      float2bin (number)
      {
          return float2bin(number) ;
      },

      /*Convert double floating point number to binary*/
      double2bin(number)
      {
          return double2bin(number) ;
      },

      /*Convert binary number to hexadecimal number*/
      bin2hex(s)
      {
          return bin2hex(s) ;
      },






      /*TODO: if is posible, include into component*/
      /*Popover functions*/
      popoverId(name){
          return 'popoverValueContent' + name[0];
      },







      //TODO: delete when all dependences are remove
      change_data_view(e, type){
        app._data.data_mode = e;

        if(e == "registers"){
          if(type == "int"){
            app._data.register_type = 'integer';
            app._data.name_tab_Reg = "Decimal";
            app._data.name_reg = 'INT Registers';
            app._data.reg_type = 'int';
          }
          else if(type == "fp"){
            app._data.register_type = 'floating point';
            app._data.name_tab_Reg = "Real";
            app._data.name_reg = 'FP Registers';
            app._data.reg_type = 'fp';
          }
        }
        if(e == "memory"){
        	app._data.data_mode = e;
        }

        app.$forceUpdate();

          /* Google Analytics */
	        creator_ga('data', 'data.view', 'data.view.' + app._data.data_mode);
      },

      //TODO: try to include in a component
      change_space_view(){
      	if(app._data.selected_space_view == "sig_int"){
    			var hex = "";
    			for (var j = 0; j < 4; j++) {
    				hex = memory[memory_hash[0]][app._data.row_index].Binary[j].Bin + hex;
    			}
    			memory[memory_hash[0]][app._data.row_index].Value = parseInt(hex, 16) >> 0;
    		}
    		else if(app._data.selected_space_view == "unsig_int"){
    			var hex = "";
    			for (var j = 0; j < 4; j++) {
    				hex = memory[memory_hash[0]][app._data.row_index].Binary[j].Bin + hex;
    			}
    			memory[memory_hash[0]][app._data.row_index].Value = parseInt(hex, 16) >>> 0;
    		}
    		else if(app._data.selected_space_view == "float"){
    			var hex = "";
    			for (var j = 0; j < 4; j++) {
    				hex = memory[memory_hash[0]][app._data.row_index].Binary[j].Bin + hex;
    			}
    			memory[memory_hash[0]][app._data.row_index].Value = this.hex2float("0x" + hex);
    		}
    		else if(app._data.selected_space_view == "char"){
    			var hex = "";
    			for (var j = 0; j < 4; j++) {
    				hex = memory[memory_hash[0]][app._data.row_index].Binary[j].Bin + hex;
    			}
    			memory[memory_hash[0]][app._data.row_index].Value = this.hex2char8(hex);
    		}

      	var i = 1;

      	while((app._data.row_index + i) < memory[memory_hash[0]].length && memory[memory_hash[0]][app._data.row_index + i].type == "space" && (memory[memory_hash[0]][app._data.row_index + i].Binary[0].Tag == null) && memory[memory_hash[0]][app._data.row_index + i].Binary[1].Tag == null && memory[memory_hash[0]][app._data.row_index + i].Binary[2].Tag == null && memory[memory_hash[0]][app._data.row_index + i].Binary[3].Tag == null){
      		if(app._data.selected_space_view == "sig_int"){
      			var hex = "";
      			for (var j = 0; j < 4; j++) {
      				hex = memory[memory_hash[0]][app._data.row_index + i].Binary[j].Bin + hex;
      			}
      			memory[memory_hash[0]][app._data.row_index + i].Value = parseInt(hex, 16) >> 0;
      		}
      		else if(app._data.selected_space_view == "unsig_int"){
      			var hex = "";
      			for (var j = 0; j < 4; j++) {
      				hex = memory[memory_hash[0]][app._data.row_index + i].Binary[j].Bin + hex;
      			}
      			memory[memory_hash[0]][app._data.row_index + i].Value = parseInt(hex, 16) >>> 0;
      		}
      		else if(app._data.selected_space_view == "float"){
      			var hex = "";
      			for (var j = 0; j < 4; j++) {
      				hex = memory[memory_hash[0]][app._data.row_index + i].Binary[j].Bin + hex;
      			}
      			memory[memory_hash[0]][app._data.row_index + i].Value = this.hex2float("0x" + hex);
      		}
      		else if(app._data.selected_space_view == "char"){
	    			var hex = "";
	    			for (var j = 0; j < 4; j++) {
	    				hex = memory[memory_hash[0]][app._data.row_index + i].Binary[j].Bin + hex;
	    			}
	    			memory[memory_hash[0]][app._data.row_index + i].Value = this.hex2char8(hex);
	    		}
      		i++;
      	}
        app._data.memory = memory;
      },

      //TODO: try to include in a component
      hide_space_modal(){
        app._data.selected_space_view = null;
      },

      //TODO: try to include in a component
      change_stack_view(){
        if(app._data.selected_stack_view == "sig_int"){
          var hex = "";
          for (var j = 0; j < 4; j++) {
            hex = memory[memory_hash[2]][app._data.row_index].Binary[j].Bin + hex;
          }
          memory[memory_hash[2]][app._data.row_index].Value = parseInt(hex, 16) >> 0;
        }
        else if(app._data.selected_stack_view == "unsig_int"){
          var hex = "";
          for (var j = 0; j < 4; j++) {
            hex = memory[memory_hash[2]][app._data.row_index].Binary[j].Bin + hex;
          }
          memory[memory_hash[2]][app._data.row_index].Value = parseInt(hex, 16) >>> 0;
        }
        else if(app._data.selected_stack_view == "float"){
          var hex = "";
          for (var j = 0; j < 4; j++) {
            hex = memory[memory_hash[2]][app._data.row_index].Binary[j].Bin + hex;
          }
          memory[memory_hash[2]][app._data.row_index].Value = this.hex2float("0x" + hex);
        }
        else if(app._data.selected_stack_view == "char"){
          var hex = "";
          for (var j = 0; j < 4; j++) {
            hex = memory[memory_hash[2]][app._data.row_index].Binary[j].Bin + hex;
          }
          memory[memory_hash[2]][app._data.row_index].Value = this.hex2char8(hex);
        }
        app._data.memory = memory;
      },

      //TODO: try to include in a component
      hide_stack_modal(){
        app._data.selected_stack_view = null;
      },



























      /*Stop user interface refresh*/
      debounce: _.debounce(function (param, e) {
        console_log(param);
        console_log(e);

        e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var re = new RegExp("'","g");
        e = e.replace(re, '"');
        re = new RegExp("[\f]","g");
        e = e.replace(re, '\\f');
        re = new RegExp("[\n\]","g");
        e = e.replace(re, '\\n');
        re = new RegExp("[\r]","g");
        e = e.replace(re, '\\r');
        re = new RegExp("[\t]","g");
        e = e.replace(re, '\\t');
        re = new RegExp("[\v]","g");
        e = e.replace(re, '\\v');

        if(e == ""){
          this[param] = null;
          return;
        }

        console_log("this." + param + "= '" + e + "'");

        eval("this." + param + "= '" + e + "'");

        //this[param] = e.toString();
        app.$forceUpdate();
      }, getDebounceTime())

    },
  });


  /*************
   * Functions *
   *************/

  /*All modules*/

  /*Error handler*/
  Vue.config.errorHandler = function (err, vm, info) {
      show_notification('An error has ocurred, the simulator is going to restart.  \n Error: ' + err, 'danger') ;
      setTimeout(function(){
        location.reload(true)
      }, 3000);
  }

  /*Closing alert*/
  window.onbeforeunload = confirmExit;
  function confirmExit(){
    return "He's tried to get off this page. Changes may not be saved.";
  }

  /*Determines the refresh timeout depending on the device being used*/
  function getDebounceTime(){
    if(screen.width > 768){
      return 500;
    }
    else{
      return 1000;
    }
  }

  /*Stop the transmission of events to children*/
  function destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }

  /*console.log*/
  function console_log(m){
    if(app._data.c_debug){
      console.log(m);
    }
  }

  /*Architecture editor*/

  /*Codemirror*/
  function codemirrorStart(){
    var editor_cfg = {
      lineNumbers: true,
      autoRefresh:true
    };

    var textarea_assembly_obj = document.getElementById("textarea_assembly");

    if (textarea_assembly_obj != null) {
      textarea_assembly_editor = CodeMirror.fromTextArea(textarea_assembly_obj, editor_cfg);
      textarea_assembly_editor.setOption('keyMap', 'sublime') ; // vim -> 'vim', 'emacs', 'sublime', ...
      textarea_assembly_editor.setValue(app._data.assembly_code);
      textarea_assembly_editor.setSize("auto", "70vh");

      // add Ctrl-m
      var map = {
        'Ctrl-M': function(cm) { cm.execCommand('toggleComment'); }
      } ;
      textarea_assembly_editor.addKeyMap(map);
    }
  }

  /*Simulator*/

  /*Binary string to integer number*/
  function binaryStringToInt( b ) {
    return parseInt(b, 2);
  }
}
catch(e)
{
  show_notification('An error has ocurred, the simulator is going to restart.  \n Error: ' + e, 'danger') ;

  /* Google Analytics */
  creator_ga('creator', 'creator.exception', 'creator.exception.' + e);

  setTimeout(function(){
    location.reload(true)
  }, 3000);
}

