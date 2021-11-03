PennController.ResetPrefix(null); // Initiates PennController
PennController.DebugOff();
PennController.AddHost("https://amor.cms.hu-berlin.de/~petrenca/CrossConn_drawings/v4_adhoc/"); // loads pictures from external server (pre-test 3 only)

// --------------------------------------------------------------------------------------------------------------  
// Preamble

var progressBarText = ""; //Changes the text of the progress bar
const replacePreloadingMessage = ()=>{   //Changes the Preloading Message
    const preloadingMessage = $(".PennController-PennController > div");
if (preloadingMessage.length > 0 && preloadingMessage[0].innerHTML.match(/^<p>Please wait while the resources are preloading/))
    preloadingMessage.html("<p>Please wait while the resources are preloading. It may take up to a minute.</p>");
window.requestAnimationFrame( replacePreloadingMessage );
};
window.requestAnimationFrame( replacePreloadingMessage );


//PennController.Sequence( "post_questionnaire", "send", "instructions", randomize("practice_trials"),shuffle(randomize("critical_trials"),randomize("filler_trials")),"demographics","post_questionnaire",  "send", "final");
PennController.Sequence("preloadPractice","preloadFillers", "preloadCritical","demographics", "practice_trials", "instructions", shuffle(randomize("critical_trials"),randomize("filler_trials")),"end_experiment", "post_questionnaire", "send", "final");

//====================================================================================================================================================================================================================
// 0. Preloading

CheckPreloaded( "practice_trials",10000)
    .label( "preloadPractice" )
    
    .log("prolificID", "preload")
    .log("nat_lang", "preload")
    .log("other_lang", "preload")
    .log("which_other", "preload")
    .log("confused", "preload")
    
    .log("investigating", "preload")
    .log("suggestions", "preload")
    .log("age", "preload")
    .log("item_number", "preload")
    .log("item_name", "preload")
    
    .log("old_item_name", "preload")
    .log("disjunction_type", "preload")
    .log("condition", "preload")
    .log("type", "preload")
    .log("outcome", "preload")
    
    .log("sentence_intro", "preload")
    .log("sentence_guess", "preload")
    .log("sentence_outcome", "preload")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


CheckPreloaded( "critical_trials", 20000)
    .label( "preloadCritical" )
    
    .log("prolificID", "preload")
    .log("nat_lang", "preload")
    .log("other_lang", "preload")
    .log("which_other", "preload")
    .log("confused", "preload")
    
    .log("investigating", "preload")
    .log("suggestions", "preload")
    .log("age", "preload")
    .log("item_number", "preload")
    .log("item_name", "preload")
    
    .log("old_item_name", "preload")
    .log("disjunction_type", "preload")
    .log("condition", "preload")
    .log("type", "preload")
    .log("outcome", "preload")
    
    .log("sentence_intro", "preload")
    .log("sentence_guess", "preload")
    .log("sentence_outcome", "preload")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


CheckPreloaded( "filler_trials", 30000)
    .label( "preloadFillers" )
    
    .log("prolificID", "preload")
    .log("nat_lang", "preload")
    .log("other_lang", "preload")
    .log("which_other", "preload")
    .log("confused", "preload")
    
    .log("investigating", "preload")
    .log("suggestions", "preload")
    .log("age", "preload")
    .log("item_number", "preload")
    .log("item_name", "preload")
    
    .log("old_item_name", "preload")
    .log("disjunction_type", "preload")
    .log("condition", "preload")
    .log("type", "preload")
    .log("outcome", "preload")
    
    .log("sentence_intro", "preload")
    .log("sentence_guess", "preload")
    .log("sentence_outcome", "preload")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 1. Welcome page
PennController("demographics",
               // ENTER PROLIFIC ID
               newText("welcometext", "<p><b>Welcome to our experiment!</b><p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("welcomecanvas", 1000, 125)
               .settings.add("center at 50%", 0, getText("welcometext") )
               .center()
               .print()
               ,
               newTextInput("proID", "")
               .before(newText("proID", "Before we begin, please enter your Prolific ID: ")
                       .settings.css("font-size", "20px"))
               .size(100, 20)
               .settings.center()
               .print()
               ,
               newText("blank","<p>")
               .print()
               ,
               newButton("cont", "Continue")
               .settings.center()
               .print()
               .wait(getTextInput("proID")
                     .test.text(/^\w{24}$/)  // this makes sure that it's not left blank
                     .success()
                     .failure(
                         newText("IDerror","<p>Please enter your Prolific ID in order to continue.")
                         .settings.color("red")
                         .settings.center()
                         .print()
                     ))
               ,  
               getCanvas("welcomecanvas")
               .remove()
               ,
               getTextInput("proID")
               .remove()
               ,
               getButton("cont")
               .remove()
               ,
               getText("IDerror")
               .remove()
               ,
               
               //====================================================================================================================================================================================================================
               // Intro/instructions
               
               newText("intro_instructions", "<p>This experiment investigates how people process linguistic information.<p>"
                       +"<b> Description of the experiment:</b> Kate and Henry are two friends who like playing games. In this experiment you will witness one of their games. The rules are as follows: Kate draws two pictures and doesn’t show them to Henry. The first picture depicts a situation and comes with a sentence describing it. The second picture depicts a follow-up scene. She shows Henry the first picture and asks him to make a guess about what’s going to happen. Then, Kate presents the second picture with the follow-up scene. <b>Your task is to judge whether Henry's guess was right by clicking the 'yes' or 'no' button</b>.<p>"
                       +"<p>Before you begin the experiment, note the following:"
                       +"<li> Please don’t take breaks during the experiment. The experiment should take 5-15 minutes. If you take longer than 20 minutes, we can't use your data and you will not be compensated.<br>"
                       +"<li> Please pay attention and try to understand the sentences and the pictures to the best of your ability. Throughout the experiment we included several attention checks; if you fail them, we can't use your data and you will not be compensated.<br>"
                       +"<li> Your confidentiality will be maintained by storing your data anonymously. The results of this research study may be presented at meetings or in publications. The data can be made accessible to other academic non-profit researchers that investigate language or language use on request.</ul><p><p>")
               .settings.css("font-size", "17px")
               ,
               newCanvas("introcanvas",1000, 180)
               .settings.add(0,-170, getText("intro_instructions"))
               //.css( "border" , "solid 1px black" )
               .center()
               .print()   
               ,
               
               //====================================================================================================================================================================================================================
               // ENTER DEMOGRAPHICS
               
               newText("instr_demo", "Lastly, please provide some basic information about yourself.<p>")              
               .settings.css("font-size", "17px")
               ,
               newCanvas("democanvas", 1000, 30)
               .settings.add(0, 0, getText("instr_demo") )
               //.css( "border" , "solid 1px black" )
               .center()
               .print()
               ,
               //newText("instr_demo2", "<p>*Note that your confidentiality will be maintained. Prolific provides no personal information to the requester. Your data will be stored in anonymous form. The results of this research study may be presented at meetings or in publications. The data can be made accessible to other academic non-profit researchers that investigate language or language use on request.<p>")
               //.settings.css("font-size", "15px")
               // ,
               //newCanvas("democanvas2", 1000, 50)
               //.settings.add(0, -10, getText("instr_demo2") )
               //.css( "border" , "solid 1px black" )
               //.print()
               //,
               newTextInput("native_languages", "")
               .size(300, 20)
               ,
               newText("native_lang", "What was(were) the language(s) you grew up speaking?<p>")
               .settings.css("font-size", "17px")
               
               .settings.bold()
               ,
               newCanvas("nativlangcanvas", 1000, 30)
               .settings.add(0, 0, getText("native_lang") )
               .settings.add(570, 0, getTextInput("native_languages") )
               //.css( "border" , "solid 1px black" )
               .center()
               .print()
               ,
               newText("other_lang", "Do you currently speak other languages on a regular basis?")
               .settings.css("font-size", "17px")
               .settings.bold()
               ,
               newTextInput("in_particular", "")
               .settings.hidden()
               ,
               newText("label input", "")
               .settings.after( getTextInput("in_particular") )
               ,
               newDropDown("other_languages", "")
               .settings.log()
               .settings.add(  "no", "yes, I also speak:")    
               .settings.after(  getText("label input") )
               .settings.callback(                                             //whenever an option is selected, do this:
                   getDropDown("other_languages")
                   .test.selected("yes, I also speak:")                             //reveal the input box
                   .success( getTextInput("in_particular").settings.visible() )     //hide the input box
                   .failure( getTextInput("in_particular").settings.hidden()  )   
               )        
               ,
               newCanvas("languagecanvas", 1000, 35)
               .settings.add(0, 0, getText("other_lang") )
               .settings.add(570, 0, getDropDown("other_languages") )
               //.css( "border" , "solid 1px black" )
               .center()
               .print()
               ,
               //newText("<p>")
               // .print()
               // ,   
               newText("consent_button", "By clicking 'I consent' button, you agree to the following: <br>"
                       +"<ol><li> I am 18 years old or older.<br>"
                       +"<li> I have read the above information, I understand it, and I agree to it.<br>"
                       +"<li> I wish to participate in the experiment.</ol><p>")
               .settings.css("font-size", "17px")
               ,
               newCanvas("infocanvasthree", 1000, 100)
               .settings.add(0, 0, getText("consent_button") )
               //.css( "border" , "solid 1px black" )
               .center()
               .print()
               ,
               newButton("consent", "I consent")
               .settings.css("font-size", "15x")
               .center()        
               .print()
               .wait()  
               ,
               newText("practice_cont", "<p>The experiment will start with two practice rounds.<p>")
               .settings.css("font-size", "17px")
               .center()       
               .print()
               ,
               newButton("start", "Start the practice")
               .settings.css("font-size", "15x")
               .center()
               .print()
               .wait(getTextInput("native_languages")
                     .test.text(/[^\s]+/)  // this makes sure that it's not left blank
                     .success()
                     .failure(
                         newText("IDerror1","Please answer the question about your language history.")
                         .settings.color("red")
                         .settings.center()
                         .print()
                         ,
                         getDropDown("other_languages")
                         .test.selected()
                         .success()
                         .failure(
                             newText("IDerror2","Please answer the question about other languages you curently speak.")
                             .settings.color("red")
                             .settings.center()
                             .print()
                             
                             
                         )))
               
               ,
               newVar("proID")
               .settings.global()
               .set( getTextInput("proID") )
               ,
               newVar("IDnatlang")
               .settings.global()
               .set( getTextInput("native_languages") )
               ,
               newVar("IDotherlang")
               .settings.global()
               .set( getDropDown("other_languages") )
               ,
               newVar("IDin_particular")
               .settings.global()
               .set( getTextInput("in_particular") )
               
              )                                 //end of welcome screen   
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("confused", "demo")
    
    .log("investigating", "demo")
    .log("suggestions", "demo")
    .log("age", "demo")
    .log("item_number", "demo")
    .log("item_name", "demo")
    
    .log("old_item_name", "demo")
    .log("disjunction_type", "demo")
    .log("condition", "demo")
    .log("type", "demo")
    .log("outcome", "demo")
    
    .log("sentence_intro", "demo")
    .log("sentence_guess", "demo")
    .log("sentence_outcome", "demo")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 2. Practice trials
PennController.Template( PennController.GetTable( "exp.adhoc.eng.complex.csv")// change this line for the appropriate experimental list
                         .filter("type" , "practice"),  
                         variable => PennController( "practice_trials",
                                                     newText("pleasewait", "...")
                                                     .settings.css("font-size", "25px")
                                                     .settings.center()
                                                     .settings.bold()
                                                     .print()
                                                     ,
                                                     newTimer("wait", 1000)
                                                     .start()
                                                     .wait()
                                                     ,
                                                     getText("pleasewait")
                                                     .remove()
                                                     ,
                                                     newImage("image_intro",variable.imgur_intro)
                                                     .settings.size(400)
                                                     ,
                                                     newImage("image_guess", variable.imgur_guess)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newImage("image_outcome",variable.imgur_outcome)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_intro","<p>"+variable.sentence_intro)
                                                     .settings.css("font-size", "20px")
                                                     ,
                                                     newText("sentence_guess", "<p>"+variable.sentence_guess)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_outcome", "<p>"+variable.sentence_outcome1)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     newCanvas("canvas2",1300,10 )
                                                     .settings.add( 40, 0,newCanvas(400,10)
                                                                    .settings.add( -10,-100, getText("sentence_intro")))
                                                     .settings.add(450, 0 ,newCanvas(400,10)
                                                                   .settings.add( 0,-100, getText("sentence_guess")))
                                                     .settings.add(875, 0 ,newCanvas(400,10)
                                                                   .settings.add(0,-100, getText("sentence_outcome")))
                                                     //.css( "border" , "solid 1px black" )
                                                     .center()
                                                     .print()
                                                     ,
                                                     newCanvas("canvas",1250,330 )
                                                     .settings.add( "left at 0%", "middle at 43%", getImage("image_intro"))
                                                     .settings.add( "center at 50%", "middle at 43%", getImage("image_guess"))
                                                     .settings.add( "right at 100%", "middle at 43%", getImage("image_outcome") )
                                                     //.css( "border" , "solid 1px black" )
                                                     .center()
                                                     .print()
                                                     ,
                                                     newText("space", "<br><br><p>")
                                                     .print()
                                                     ,
                                                     newButton("next_guess", "Next")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getText("sentence_guess")
                                                     .visible()
                                                     ,
                                                     getImage("image_guess")
                                                     .visible()
                                                     ,
                                                     getButton("next_guess")
                                                     .remove()
                                                     ,
                                                     newButton("next_outcome", "Next")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_outcome")
                                                     .visible()
                                                     ,
                                                     getText("sentence_outcome")
                                                     .visible()
                                                     ,
                                                     getButton("next_outcome").remove()
                                                     ,
                                                     getText("space"). remove()
                                                     ,
                                                     newText("sent_scale", "<p><b>Was the guess right?</b><p>")
                                                     .settings.css("font-size", "20px")
                                                     .settings.center()
                                                     .print()
                                                     ,
                                                     newScale("question", "YES",   "NO")
                                                     .radio()
                                                     .labelsPosition("right")
                                                     .settings.center()
                                                     .settings.css("font-size", "20px")
                                                     .log("last")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     newText("<p>")
                                                     .print()
                                                     ,
                                                     newButton("validation", "Validate")
                                                     .settings.css("font-size", "15px")
                                                     .settings.center()
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getCanvas("canvas").remove()
                                                     ,
                                                     getCanvas("canvas2").remove()
                                                     ,
                                                     getScale("question").remove()
                                                     ,
                                                     getText("sent_scale"). remove()
                                                     ,
                                                     getButton("validation") .remove()
                                                     
                                                    )
                         .log("prolificID", getVar("proID"))
                         .log("nat_lang", getVar("IDnatlang"))
                         .log("other_lang", getVar("IDotherlang"))
                         .log("which_other", getVar("IDin_particular"))
                         .log("confused", "practice")
                         
                         .log("investigating", "practice")
                         .log("suggestions", "practice")
                         .log("age","practice")
                         .log("item_number", variable.item_number)
                         .log("item_name", variable.item_name)
                         
                         .log("old_item_name", variable.old_item_name)
                         .log("disjunction_type", variable.disjunction_type)
                         .log("condition", variable.condition)
                         .log("type", variable.type)
                         .log("outcome", variable.outcome)
                         
                         .log("sentence_intro", variable.sentence_intro)
                         .log("sentence_guess", variable.sentence_guess)
                         .log("sentence_outcome", variable.sentence_outcome2)
                         
                         .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
                         .setOption("hideProgressBar", true)
                        );

//====================================================================================================================================================================================================================
// 4. Instructions
PennController( "instructions" ,
                newText("intro_experiment", "<p>That's the end of the practice rounds. You will now start the actual experiment.<p>")
                .settings.css("font-size", "18px")
                .center()
                .print()
                ,
                newButton("start2", "Start the experiment")
                .settings.css("font-size", "15px")
                .settings.center()
                .print()
                .wait())
    
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("confused", "instructions")
    
    .log("investigating", "instructions")
    .log("suggestions", "instructions")
    .log("age","instructions")
    .log("item_number", "instructions")
    .log("item_name", "instructions")
    
    .log("old_item_name", "instructions")
    .log("disjunction_type", "instructions")
    .log("condition", "instructions")
    .log("type", "instructions")
    .log("outcome", "instructions")
    
    .log("sentence_intro", "instructions")
    .log("sentence_guess", "instructions")
    .log("sentence_outcome", "instructions")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 4. Experimental trials
PennController.Template( PennController.GetTable( "exp.adhoc.eng.complex.csv")// change this line for the appropriate experimental list
                         .filter("type" , "test_item"),  
                         variable => PennController( "critical_trials",
                                                     newText("pleasewait", "...")
                                                     .settings.css("font-size", "25px")
                                                     .settings.center()
                                                     .settings.bold()
                                                     .print()
                                                     ,
                                                     newTimer("wait", 1000)
                                                     .start()
                                                     .wait()
                                                     ,
                                                     getText("pleasewait")
                                                     .remove()
                                                     ,
                                                     newImage("image_intro",variable.imgur_intro)
                                                     .settings.size(400)
                                                     ,
                                                     newImage("image_guess", variable.imgur_guess)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newImage("image_outcome",variable.imgur_outcome)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_intro","<p>"+variable.sentence_intro)
                                                     .settings.css("font-size", "20px")
                                                     ,
                                                     newText("sentence_guess", "<p>"+variable.sentence_guess)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_outcome", "<p>"+variable.sentence_outcome1)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     
                                                     newCanvas("canvas2",1300,10 )
                                                     .settings.add( 40, 0,newCanvas(400,10)
                                                                    .settings.add( -10,-50, getText("sentence_intro")))
                                                     .settings.add(450, 0 ,newCanvas(400,10)
                                                                   .settings.add( 0,-50, getText("sentence_guess")))
                                                     .settings.add(875, 0 ,newCanvas(400,10)
                                                                   .settings.add(0,-50, getText("sentence_outcome")))
                                                     //.css( "border" , "solid 1px black" )
                                                     .center()
                                                     .print()
                                                     ,
                                                     newCanvas("canvas",1250,350 )
                                                     .settings.add( "left at 0%", "middle at 55%", getImage("image_intro"))
                                                     .settings.add( "center at 50%", "middle at 55%", getImage("image_guess"))
                                                     .settings.add( "right at 100%", "middle at 55%", getImage("image_outcome") )
                                                     //.css( "border" , "solid 1px black" )
                                                     .center()
                                                     .print()
                                                     ,
                                                     newText("space", "<br><br><p>")
                                                     .print()
                                                     ,
                                                     newButton("next_guess", "Next")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_guess")
                                                     .visible()
                                                     ,
                                                     getText("sentence_guess")
                                                     .visible()
                                                     ,
                                                     getButton("next_guess")
                                                     .remove()
                                                     ,
                                                     newButton("next_outcome", "Next")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_outcome")
                                                     .visible()
                                                     ,
                                                     getText("sentence_outcome")
                                                     .visible()
                                                     ,
                                                     getButton("next_outcome").remove()
                                                     ,
                                                     getText("space"). remove()
                                                     ,
                                                     newText("sent_scale", "<br><p><b>Was the guess right?</b>")
                                                     .settings.css("font-size", "20px")
                                                     .settings.center()
                                                     .print()
                                                     ,
                                                     newScale("question", "YES",   "NO")
                                                     .radio()
                                                     .labelsPosition("right")
                                                     .settings.center()
                                                     .settings.css("font-size", "20px")
                                                     .log("last")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     newText("<p>")
                                                     .print()
                                                     ,
                                                     newButton("validation", "Validate")
                                                     .settings.css("font-size", "15px")
                                                     .settings.center()
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getCanvas("canvas").remove()
                                                     ,
                                                     getCanvas("canvas2").remove()
                                                     ,
                                                     getScale("question").remove()
                                                     ,
                                                     getText("sent_scale"). remove()
                                                     ,
                                                     getButton("validation") .remove()
                                                     
                                                     
                                                    )
                         .log("prolificID", getVar("proID"))
                         .log("nat_lang", getVar("IDnatlang"))
                         .log("other_lang", getVar("IDotherlang"))
                         .log("which_other", getVar("IDin_particular"))
                         .log("confused", "experimental")
                         
                         .log("investigating", "experimental")
                         .log("suggestions", "experimental")
                         .log("age","experimental")
                         .log("item_number", variable.item_number)
                         .log("item_name", variable.item_name)
                         
                         .log("old_item_name", variable.old_item_name)
                         .log("disjunction_type", variable.disjunction_type)
                         .log("condition", variable.condition)
                         .log("type", variable.type)
                         .log("outcome", variable.outcome)
                         
                         .log("sentence_intro", variable.sentence_intro)
                         .log("sentence_guess", variable.sentence_guess)
                         .log("sentence_outcome", variable.sentence_outcome2)
                        );


//====================================================================================================================================================================================================================
// 5. Filler items

PennController.Template( PennController.GetTable( "exp.adhoc.eng.complex.csv")// change this line for the appropriate experimental list
                         .filter("type" , "filler_item"),  
                         variable => PennController( "filler_trials",
                                                     newText("pleasewait", "...")
                                                     .settings.css("font-size", "25px")
                                                     .settings.center()
                                                     .settings.bold()
                                                     .print()
                                                     ,
                                                     newTimer("wait", 1000)
                                                     .start()
                                                     .wait()
                                                     ,
                                                     getText("pleasewait")
                                                     .remove()
                                                     ,
                                                     newImage("image_intro",variable.imgur_intro)
                                                     .settings.size(400)
                                                     ,
                                                     newImage("image_guess", variable.imgur_guess)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newImage("image_outcome",variable.imgur_outcome)
                                                     .settings.size(400)
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_intro","<p>"+variable.sentence_intro)
                                                     .settings.css("font-size", "20px")
                                                     ,
                                                     newText("sentence_guess", "<p>"+variable.sentence_guess)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     newText("sentence_outcome", "<p>"+variable.sentence_outcome1)
                                                     .settings.css("font-size", "20px")
                                                     .settings.hidden()
                                                     ,
                                                     
                                                     newCanvas("canvas2",1300,10 )
                                                     .settings.add( 40, 0,newCanvas(400,10)
                                                                    .settings.add( -10,-50, getText("sentence_intro")))
                                                     .settings.add(450, -50 ,newCanvas(400,10)
                                                                   .settings.add( 0,0, getText("sentence_guess")))
                                                     .settings.add(875, -50 ,newCanvas(400,10)
                                                                   .settings.add(0,0, getText("sentence_outcome")))
                                                     .center()
                                                     .print()
                                                     ,
                                                     newCanvas("canvas",1250,350 )
                                                     .settings.add( "left at 0%", "middle at 55%", getImage("image_intro"))
                                                     .settings.add( "center at 50%", "middle at 55%", getImage("image_guess"))
                                                     .settings.add( "right at 100%", "middle at 55%", getImage("image_outcome") )
                                                     .center()
                                                     .print()
                                                     ,
                                                     newText("space", "<br><br><p>")
                                                     .print()
                                                     ,
                                                     newButton("next_guess", "Next")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_guess")
                                                     .visible()
                                                     ,
                                                     getText("sentence_guess")
                                                     .visible()
                                                     ,
                                                     getButton("next_guess")
                                                     .remove()
                                                     ,
                                                     newButton("next_outcome", "Next")
                                                     .settings.center()
                                                     .settings.css("font-size", "15px")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getImage("image_outcome")
                                                     .visible()
                                                     ,
                                                     getText("sentence_outcome")
                                                     .visible()
                                                     ,
                                                     getButton("next_outcome").remove()
                                                     ,
                                                     getText("space"). remove()
                                                     ,
                                                     newText("sent_scale", "<br><p><b>Was the guess right?</b><p>")
                                                     .settings.css("font-size", "20px")
                                                     .settings.center()
                                                     .print()
                                                     ,
                                                     newScale("question", "YES",   "NO")
                                                     .radio()
                                                     .labelsPosition("right")
                                                     .settings.center()
                                                     .settings.css("font-size", "20px")
                                                     .log("last")
                                                     .print()
                                                     .wait()
                                                     ,
                                                     newText("<p>")
                                                     .print()
                                                     ,
                                                     newButton("validation", "Validate")
                                                     .settings.css("font-size", "15px")
                                                     .settings.center()
                                                     .print()
                                                     .wait()
                                                     ,
                                                     getCanvas("canvas").remove()
                                                     ,
                                                     getCanvas("canvas2").remove()
                                                     ,
                                                     getScale("question").remove()
                                                     ,
                                                     getText("sent_scale"). remove()
                                                     ,
                                                     getButton("validation") .remove()
                                                     
                                                     
                                                    )
                         .log("prolificID", getVar("proID"))
                         .log("nat_lang", getVar("IDnatlang"))
                         .log("other_lang", getVar("IDotherlang"))
                         .log("which_other", getVar("IDin_particular"))
                         .log("confused", "fillers")
                         
                         .log("investigating", "fillers")
                         .log("suggestions", "fillers")
                         .log("age","fillers")
                         .log("item_number", variable.item_number)
                         .log("item_name", variable.item_name)
                         
                         .log("old_item_name", variable.old_item_name)
                         .log("disjunction_type", variable.disjunction_type)
                         .log("condition", variable.condition)
                         .log("type", variable.type)
                         .log("outcome", variable.outcome)
                         
                         .log("sentence_intro", variable.sentence_intro)
                         .log("sentence_guess", variable.sentence_guess)
                         .log("sentence_outcome", variable.sentence_outcome2)
                        );
//====================================================================================================================================================================================================================
// 12. End

PennController( "end_experiment",
                newText("<p><br>")
                .print()
                ,
                newButton("end_experiment" ,"Finish the experiment")
                .settings.center()
                .print()
                .wait()
                ,
                getButton("end_experiment")
                .remove()
               )
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("confused", "end_exp")
    
    .log("investigating", "end_exp")
    .log("suggestions", "end_exp")
    .log("age","end_exp")
    .log("item_number", "end_exp")
    .log("item_name", "end_exp")
    
    .log("old_item_name", "end_exp")
    .log("disjunction_type", "end_exp")
    .log("condition", "end_exp")
    .log("type", "end_exp")
    .log("outcome", "end_exp")
    
    .log("sentence_intro", "end_exp")
    .log("sentence_guess", "end_exp")
    .log("sentence_outcome", "end_exp");

//====================================================================================================================================================================================================================
// 6. Post questionnaire

PennController( "post_questionnaire" ,
                newText("post_instructions", "<p>We welcome your feedback on this experiment!<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("postcanvas",900, 80)
                .settings.add(-50,0, getText("post_instructions"))
                .center()
                .print()   
                ,
                newText("text_scale", "<p> Did you read the instructions and do you think you did the experiment correctly?<p>")
                .settings.css("font-size", "20px")
                .settings.center()
                ,
                newScale("confused", "Yes",   "No", "I was confused")
                .radio()
                .labelsPosition("right")
                .settings.css("font-size", "20px")
                //.log("last")
                ,
                newCanvas("scalecanvas",900, 130)
                .settings.add(-50,0, getText("text_scale"))
                .settings.add(-50,70, getScale("confused"))
                .center()
                .print()
                ,
                newTextInput("exp_investigated", "")
                .size(700, 40)
                //.log()
                ,
                newText("exptext", "What do you think this experiment was investigating?")
                .settings.css("font-size", "20px")    
                ,
                newCanvas("expcanvas", 1000, 85)
                .settings.add(0, 0, getText("exptext") )
                .settings.add(0, 30, getTextInput("exp_investigated") )
                .center()
                .print()
                ,
                newTextInput("suggestions", "")
                .size(700, 40)
                //.log()
                ,
                newText("suggesttext", "Do you have any suggestions for us? We are interested in any comments you may have.")
                .settings.css("font-size", "20px")    
                ,
                newCanvas("suggestcanvas", 1000, 75)
                .settings.add(0, 10, getText("suggesttext") )
                .settings.add(0, 40, getTextInput("suggestions") )
                .center()
                .print()
                ,
                newTextInput("age", "")
                .size(120, 20)
                //.log()
                ,
                newText("agetext", "What is your age?")
                .settings.css("font-size", "20px")    
                ,
                newCanvas("agecanvas", 1000, 85)
                .settings.add(0, 30, getText("agetext") )
                .settings.add(160, 32, getTextInput("age") )
                .center()
                .print()
                ,
                newButton("finish", "Finish the questionnaire")
                .settings.css("font-size", "15px")
                //.center()
                .print(570, 610)
                .wait(getTextInput("age")
                      .test.text(/^[0-9]{2}$/)  // this makes sure that it's not left blank
                      .success()
                      .failure(
                          newText("IDerror","<p>Please indicate your age in order to continue.")
                          .settings.color("red")
                          .settings.center()
                          .print()
                      ))
                ,
                newVar("confused")
                .settings.global()
                .set( getScale("confused") )
                ,
                newVar("investigating")
                .settings.global()
                .set( getTextInput("exp_investigated") )
                ,
                newVar("suggestions")
                .settings.global()
                .set( getTextInput("suggestions") )
                ,
                newVar("age")
                .settings.global()
                .set( getTextInput("age") )
                
               )
    
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("confused", getVar("confused"))
    
    .log("investigating", getVar("investigating"))
    .log("suggestions", getVar("suggestions"))
    .log("age", getVar("age"))
    .log("item_number", "post")
    .log("item_name", "post")
    
    .log("old_item_name", "post")
    .log("disjunction_type", "post")
    .log("condition", "post")
    .log("type", "post")
    .log("outcome", "post")
    
    .log("sentence_intro", "post")
    .log("sentence_guess", "post")
    .log("sentence_outcome", "post")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//====================================================================================================================================================================================================================
// 7. Send results

PennController.SendResults( "send" )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 8. Good-bye

PennController( "final",
                newText("final_text","<p><b>Thank you for your participation!</b><p><br><p>To validate your participation and receive your payment click here: <a href='https://app.prolific.co/submissions/complete?cc=85D8B6D0' target='_blank' >Validate participation</a><p><br> <p>All data and information that we collect in this experiment are treated confidentially and used only for scientific purposes.<p> <p>If you have any questions about this study please contact us at <b>cross.conn.dfg@gmail.com</b>.<p>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                newButton("void")
                .wait()
               )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);