PennController.ResetPrefix(null); // Initiates PennController
//PennController.DebugOff();
//PennController.AddHost("https://filedn.com/lH9cUW1CPJs0WcMcH0isJAJ/"); // loads pictures from external server (pre-test 3 only)

PennController.Sequence("demographics","instructions", "critical_trials", "post_questionaire", "send", "final");
//PennController.Sequence("demographics","instructions", "critical_trials", "post_questionaire", "send", "final");


//====================================================================================================================================================================================================================
// 1. Welcome page
PennController("demographics",
               // ENTER PROLIFIC ID
               newText("welcometext", "<p><b>Welcome to our experiment!</b><p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("welcomecanvas", 1000, 125)
               .settings.add("center at 50%", 0, getText("welcometext") )
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
                     .test.text(/[^\s]+/)  // this makes sure that it's not left blank
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
               getText("welcometext")
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
               // ENTER DEMOGRAPHICS
               newText("instr_demo", "<p>Before you begin the experiment, please provide some basic information about yourself.*<p> <p><b>*Your confidentiality will be maintained.</b> Prolific provides no personal information to the requester. Your data will be stored in anonymous form. The results of this research study may be presented at meetings or in publications. The data can be made accessible to other academic non-profit researchers that investigate language or language use on request.<p>")              
               .settings.css("font-size", "20px")
               ,
               newCanvas("democanvas", 1000, 190)
               .settings.add(0, 0, getText("instr_demo") )
               .print()
               ,
               newTextInput("age", "")
               .size(120, 20)
               ,
               newText("agetext", "Age:")
               .settings.css("font-size", "20px")
               .settings.bold()    
               ,
               newCanvas("agecanvas", 1000, 45)
               .settings.add(0, 10, getText("agetext") )
               .settings.add(120, 8, getTextInput("age") )
               .print()    
               ,
               newText("gender", "Gender:")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newDropDown("sex", "" )
               .settings.add( "female", "male", "other", "prefer not to disclose")
               ,
               newCanvas("sexcanvas", 1000, 30)
               .settings.add(0, 10, getText("gender") )
               .settings.add(120, 5, getDropDown("sex") )
               .print()
               ,
               newTextInput("native_languages", "")
               .size(200, 20)
               ,
               newText("native_lang", "<p>What was(were) the language(s) spoken at home when you were a child?<p>")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newCanvas("nativlangcanvas", 1000, 75)
               .settings.add(0, 10, getText("native_lang") )
               .settings.add(660, 30, getTextInput("native_languages") )
               .print()
               ,
               newText("other_lang", "Do you currently speak other languages on a regular basis?")
               .settings.css("font-size", "20px")
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
               newCanvas("languagecanvas", 1000, 25)
               .settings.add(0, 0, getText("other_lang") )
               .settings.add(660, 2, getDropDown("other_languages") )
               .print()
               ,
               newText("<p> ")
               .print()
               ,    
               
               newText("consent_button", "<p>By clicking 'I consent' button, you agree to the following: <br><p> <b>1.</b> I am 18 years old or older. <br> <b>2.</b>  I have read the above information, I understand it, and I agree to it. <br> <b>3.</b>  I wish to participate in the experiment. <p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("infocanvasthree", 1000, 155)
               .settings.add(0, 0, getText("consent_button") )
               .print()
               ,
               newButton("consent", "I consent")
               .settings.css("font-size", "15px")
               //.settings.center()        
               .print()
               .wait()  
               ,
               newButton("start", "Continue to the experiment")
               //.settings.center()  
               ,
               getTextInput("age")
               .test.text(/[^\s]+/)
               .success()
               .failure(
                   newText("<br>Please indicate your age and press <b>'Enter'</b>.")
                   .settings.color("red")
                   .print())   
               ,
               getDropDown("sex")
               .test.selected()
               .success()
               .failure(
                   newText("Please indicate your gender.")
                   .settings.color("red")
                   .print())
               ,
               getTextInput("native_languages")
               .test.text(/[^\s]+/)
               .success()
               .failure(
                   newText("Please answer the question about your language history and press <b>'Enter'</b>.")
                   .settings.color("red")
                   .print())
               ,
               getDropDown("other_languages")
               .test.selected()
               .success()
               .failure(
                   newText("Please answer the question about other languages you curently speak on a regular basis.<p>")                   
                   .settings.color("red")
                   .print())      
               ,
               getTextInput("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getTextInput("native_languages") .wait("first")
               ,
               getDropDown("other_languages").wait("first")
               ,
               getButton("start")
               .print()
               .wait()
               ,   
               newVar("IDage")
               .settings.global()
               .set( getTextInput("age") )
               ,
               newVar("IDsex")
               .settings.global()
               .set( getDropDown("sex") )
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
               ,
               newVar("proID")
               .settings.global()
               .set( getTextInput("proID") )
              )                                 //end of welcome screen
    
    .log("prolificID", getVar("proID"))
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    
    .log( "withsquare", PennController.GetURLParameter("withsquare") )
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 2. Intro/instructions

PennController( "instructions" ,
                newText("intro_instructions", "<p><b>Thank you for taking part in our experiment!</b><p><p>Your participation is completely voluntary, and you may stop the experiment at any time.<br> <b>You may only participate and be compensated once.</b><p><br><p>This experiment investigates how people process linguistic information.<p> <p>In the experiment you will be presented with a sequence of pictures and sentences. You will first see a picture followed by a sentence describing the situation depicted. Afterwards, you will be presented with a guess about what’s going to happen and in the final picture you will learn what actually happened.<br> <b>Your task will be to judge whether the guess was right by clicking 'yes'/'no' button</b>.<p><br><p>The experiment will start with two practice rounds. It should take approximately 5-10 minutes. At the end you will receive a code which you should copy into xxx in order to receive your payment.<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("introcanvas",900, 450)
                .settings.add(0,0, getText("intro_instructions"))
                .print()   
                ,
                newTimer("intro", 500)
                .start()
                .wait()
                ,
                newButton("next_guess", "Start the practice")
                //.settings.center()
                .settings.css("font-size", "15px")
                .print()
                .wait()
                ,
                getCanvas("introcanvas")
                .remove()
                
                
               )
    
    .log("prolificID", getVar("proID"))
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    
    .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 4. Experimental trials

PennController. Template( PennController.GetTable("list2.csv"),
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
                                                      newText("sentence_guess", "<p>"+variable.sentence_guess1+"<br>"+variable.sentence_guess2)
                                                      .settings.css("font-size", "20px")
                                                      .settings.hidden()
                                                      ,
                                                      newText("sentence_outcome", "<p>"+variable.sentence_outcome1+"<br>"+variable.sentence_outcome2)
                                                      .settings.css("font-size", "20px")
                                                      .settings.hidden()
                                                      ,
                                                      newCanvas("canvas",1250,410 )
                                                      .settings.add( "left at 3%", "middle at 50%", getImage("image_intro"))
                                                      .settings.add( "center at 53%", "middle at 50%", getImage("image_guess"))
                                                      .settings.add( "right at 103%", "middle at 50%", getImage("image_outcome") )
                                                      .print()
                                                      ,
                                                      
                                                      newCanvas("canvas2",1300,100 )
                                                      .settings.add( 40, 0,newCanvas(400,10)
                                                                     .settings.add( 0,0, getText("sentence_intro")))
                                                      .settings.add(470, 0 ,newCanvas(400,10)
                                                                    .settings.add( 0,0, getText("sentence_guess")))
                                                      .settings.add(900, 0 ,newCanvas(400,10)
                                                                    .settings.add(0,0, getText("sentence_outcome")))
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
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    
    .log( "withsquare", PennController.GetURLParameter("withsquare") )
    ); //logs what the URL version each participant used was

//====================================================================================================================================================================================================================
// 5. Post questionaire

PennController( "post_questionaire" ,
                newText("post_instructions", "<p>Please answer the following questions about the experiment:<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("postcanvas",900, 80)
                .settings.add(0,0, getText("post_instructions"))
                .print()   
                ,
                newText("text_scale", "<p><b>1. Did you read the instructions and do you think you did the experiment correctly?</b><p>")
                .settings.css("font-size", "20px")
                .settings.center()
                ,
                newScale("question", "Yes",   "No", "I was confused")
                .radio()
                .labelsPosition("right")
                //.settings.center()
                .settings.css("font-size", "20px")
                .log("last")
                //.print()
                //.wait()
                ,
                newCanvas("scalecanvas",900, 130)
                .settings.add(0,0, getText("text_scale"))
                .settings.add(0,70, getScale("question"))
                .print()
                
                ,
                
                newTextInput("exp_investigated", "")
                .size(120, 20)
                ,
                newText("exptext", "2. What do you think this experiment was investigating?")
                .settings.css("font-size", "20px")
                .settings.bold()    
                ,
                newCanvas("expcanvas", 1000, 55)
                .settings.add(0, 0, getText("exptext") )
                .settings.add(500, 2, getTextInput("exp_investigated") )
                .print()
                ,
                newTextInput("suggestions", "")
                .size(120, 20)
                ,
                newText("suggesttext", "<b>3. Do you have any suggestions for us?</b> We are interested in any comments you may have.")
                .settings.css("font-size", "20px")
                //.settings.bold()    
                ,
                newCanvas("suggestcanvas", 1000, 75)
                .settings.add(0, 10, getText("suggesttext") )
                .settings.add(750, 8, getTextInput("suggestions") )
                .print()
                ,
                getScale("question")
                .wait()
                ,
                /*getTextInput("exp_investigated")
               .test.text(/[^\s]+/)
               .success()
               .failure(
                   newText("Please answer the question 2. and press 'Enter'.")
                   .settings.color("red")
                   .print())
                ,
                getTextInput("suggestions")
               .test.text(/[^\s]+/)
               .success()
               .failure(
                   newText("Please answer the question 3. and press 'Enter'.")
                   .settings.color("red")
                   .print())
                ,*/
                newButton("finish", "Finish the experiment")
                .settings.css("font-size", "15px")
                // .settings.center()
                .print()
                .wait(getTextInput("suggestions")
                     .test.text(/[^\s]+/)  // this makes sure that it's not left blank
                     .success()
                     .failure(
                         newText("IDerror","<p>Please answer the question 2. and press <b>'Enter'</b>.")
                         .settings.color("red")
                         .print()
                         ,
                         getTextInput("exp_investigated")
                     .test.text(/[^\s]+/)  // this makes sure that it's not left blank
                     .success()
                     .failure(
                         newText("IDerror","Please answer the question 3. and press <b>'Enter'</b>.<p>")
                         .settings.color("red")
                         .print()
                ))))
    
    .log("prolificID", getVar("proID"))
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    
    .log( "withsquare", PennController.GetURLParameter("withsquare") ) //logs what the URL version each participant used was
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//====================================================================================================================================================================================================================
// 10. Send results

PennController.SendResults( "send" )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 11. Good-bye

PennController( "final",
                newText("final_text","<p><b>Thank you for your participation!</b><p><br><p>This is your Validation Code: <b>XX</b>. Please enter this code into XX in order to receive your payment.<p><br> <p>All data and information that we collect in this experiment are treated confidentially and used only for scientific purposes.<p> <p>If you have any questions about this study please contact us at <b>cross.conn.dfg@gmail.com</b>.<p>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                newButton("void")
                .wait()
               )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

