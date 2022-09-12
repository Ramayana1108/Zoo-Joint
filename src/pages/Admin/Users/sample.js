//ADD USER CODES
{/* <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <div class="center"></div>
              <br></br>

              <div className="form-group mt-3"></div>
            <label>First Name</label>
              <input type="string" className="form-control mt-1" name="first_name" placeholder="First Name" value={values.first_name} onChange={handleInputChange}/>
            <input type="text" name="last_name" placeholder="Last Name" value={values.last_name} onChange={handleInputChange}/>
            <input type="text" name="username" placeholder="Username" value={values.username} onChange={handleInputChange}/>
            <input   type={isShown ? "text" : "password"} placeholder="Password" name="password"  value={values.password} onChange={handleInputChange}/>
            <label htmlFor="checkbox">Show password?</label>
            <input id="checkbox" type="checkbox" checked={isShown}  onChange={togglePassword}/>
                <br></br>
                <button onClick={AddUser}>Save User</button>
                <button onClick={Cancel}>Cancel</button>
                </div>
                </form>
                </div> */}

// EDIT USER ORIG CODES
{/* <div>        
            <form>
                <h5>first name</h5>
                <input type="string" name="first_name" value={values.first_name} onChange={handleInputChange} />
                <h5>Last name</h5>
                <input type="text" name="last_name" value={values.last_name} onChange={handleInputChange} />
                <h5>Username</h5>
                <input type="text" name="username" value={values.username} onChange={handleInputChange}  />
                <h5>Password</h5>
                <input   type={isShown ? "text" : "password"} name="password" value={values.password} onChange={handleInputChange}/>
                <label htmlFor="checkbox">Show password?</label>
                <input id="checkbox" type="checkbox" checked={isShown}  onChange={togglePassword}/>
                <h5>Can Edit</h5>
                <select name="canEdit" onChange={handleInputChange}>
                    <option value={String(values.canEdit) === "true" ? Boolean(true) : Boolean(false)}>{values.canEdit === "true" ? "Yes" : "No"}</option>
                    <option value={String(values.canEdit) === "true" ? Boolean(false) : Boolean(true)}>{values.canEdit === "true" ? "No" : "Yes"}</option>
                </select>
                <br></br>
                <br></br>           
            </form>
            <button onClick={HandleUpdate}>Save</button> 
            <button onClick={Cancel}>Cancel</button>   
          
        </div> */}

        //EDIT USER
                
    //     <div>        
    //     <form>
    //         <h5>first name</h5>
    //         <input type="string" name="first_name" value={values.first_name} onChange={handleInputChange} />
    //         <h5>Last name</h5>
    //         <input type="text" name="last_name" value={values.last_name} onChange={handleInputChange} />
    //         <h5>Username</h5>
    //         <input type="text" name="username" value={values.username} onChange={handleInputChange}  />
    //         <h5>Password</h5>
    //         <input   type={isShown ? "text" : "password"} name="password" value={values.password} onChange={handleInputChange}/>
    //         <label htmlFor="checkbox">Show password?</label>
    //         <input id="checkbox" type="checkbox" checked={isShown}  onChange={togglePassword}/>
    //         <h5>Can Edit</h5>
    //         <select name="canEdit" onChange={handleInputChange}>
    //             <option value={String(values.canEdit) === "true" ? Boolean(true) : Boolean(false)}>{values.canEdit === "true" ? "Yes" : "No"}</option>
    //             <option value={String(values.canEdit) === "true" ? Boolean(false) : Boolean(true)}>{values.canEdit === "true" ? "No" : "Yes"}</option>
    //         </select>
    //         <br></br>
    //         <br></br>           
    //     </form>
    //     <button onClick={HandleUpdate}>Save</button> 
    //     <button onClick={Cancel}>Cancel</button>   
      
    // </div>

        //ADD CHATBOT Q&A CODES
      //   <div>
      //   <NavWrapper>
      //     <div class="container">
      //       <label><b>Question</b></label>
      //        <input type="text" name="question" value={values.question} onChange={handleInputChange}></input>
    
      //        <label><b>Answer</b></label>
      //         <input  name="answer" value={values.answer} onChange={handleInputChange}></input>
      //       <br/>
      //       <button onClick={AddQA}>Save</button>
      //       <button onClick={Cancel}>Cancel</button>
      //     </div>
      //   </NavWrapper>      
      // </div>

      // UPDATE ABOUT US ORIG CODES

      /*<div>
        <NavWrapper>
          <div class="container">
            <label><b>Email</b></label>
              <input type="text" name="abt_name" value={values.abt_email} onChange={handleInputChange}></input>
            <label><b>Website</b></label>
              <input type="text" name="abt_website" value={values.abt_website} onChange={handleInputChange}></input>

            <label><b>Description</b></label>
              <textarea  name="abt_description" value={values.abt_description} onChange={handleInputChange}></textarea>
            <label><b>Address</b></label>
              <textarea  name="abt_address" value={values.abt_address} onChange={handleInputChange}></textarea>
            <br/>
            <button>
              <label htmlFor="file">
                Upload Image
              </label>
              <input
                type="file"
                name="abt_image"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />             
            </button>
            <input value={file.name} disabled={true}/>
            <br></br>
                
          
            <button onClick={HandleUpdate}>Save</button>
            <button onClick={Cancel}>Cancel</button>
          </div>
        </NavWrapper>
      </div>


<NavWrapper>
<div class="container">
  <label><b>Email</b></label>
  <input type="text" name="abt_email" value={values.abt_email} onChange={handleInputChange}></input>
  <label><b>Website</b></label>
    <input type="text" name="abt_website" value={values.abt_website} onChange={handleInputChange}></input>

  <label><b>Description</b></label>
    <textarea  name="abt_description" value={values.abt_description} onChange={handleInputChange}></textarea>
  <label><b>Address</b></label>
    <textarea  name="abt_address" value={values.abt_address} onChange={handleInputChange}></textarea>
  <br/>
  <button>
    <label htmlFor="file">
      Upload Image
    </label>
    <input
      type="file"
      name="abt_image"
      id="file"
      onChange={(e) => setFile(e.target.files[0])}
      style={{ display: "none" }}
    />             
  </button>
  <input value={file.name} disabled={true}/>
  <br></br>
      

  <button onClick={UpdateAboutus}>Save</button>
  <button onClick={Cancel}>Cancel</button>
</div>
</NavWrapper>*/