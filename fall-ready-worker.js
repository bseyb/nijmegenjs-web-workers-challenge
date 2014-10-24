if(typeof Worker != 'function'){
	var FallReadyWorker = function(obj){

		this.worker = obj.worker;
		this.onMessage = obj.onMessage;

		this.say = function(param){
			var e = {};
			e.data = this.worker.func(param);
			this.onMessage(e);
		};
	};

}
else{
	var FallReadyWorker = function(obj){

		this.worker = obj.worker;
		this.onMessage = obj.onMessage; 
			
		var workerstring = 'var func = '+String(this.worker.func)+';'+"self.addEventListener('message', function(e){self.postMessage("+String(this.worker.getPostData)+"(e));}, false);";
		var funcblob = new Blob([workerstring]);
		var funcurl = window.URL.createObjectURL(funcblob);
		this.workerinstance = new Worker(funcurl);
		this.workerinstance.addEventListener('message', this.onMessage, false);

		this.say = function(param){
			this.workerinstance.postMessage(param);
		};
	};
}