<div>
        <NavWrapper>
        <h1>Edit About Us Page</h1>
        <div className="Auth-form-container-about">
        <form className="Auth-form-about">
          <div className="Auth-form-content-about">
            <div class="center">
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="text"
                name="abt_name"
                className="form-control mt-1"
                value={values.abt_email} 
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Website</label>
              <input
                type="text"
                name="abt_website"
                className="form-control mt-1"
                placeholder="Enter Last Name"
                value={values.abt_website} 
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Description</label>
              <textarea
                type="text"
                name="abt_description"
                className="form-control mt-1"
                value={values.abt_description} 
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Address</label>
              <textarea
                type="text"
                name="abt_address"
                className="form-control mt-1"
                value={values.abt_address} 
                onChange={handleInputChange}
              />
            </div>
            <br></br>

            <div class="right">
            <button className="btn btn-primary-upload">
            <label htmlFor="file">Upload Image&nbsp;</label>
            <input
                type="file"
                name="abt_image"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />    
            </button>
            <input value={file.name} disabled={true}/>           
            </div>
            <br></br>
            
            <div className="login-btn-about">
              <button onClick={HandleUpdate} className="btn btn-primary-about">
                Save
              </button>
              
            </div>

            <div className="login-btn-about">
              <button onClick={Cancel} className="btn btn-primary-aboutcancel">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
        </NavWrapper>
      </div>