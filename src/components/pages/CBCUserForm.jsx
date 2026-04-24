import React, { useState } from 'react';

const CreateCBCUserForm = () => {
  // 1. All state must be inside the component
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', mobileNumber: '',
    emailAddress: '', adminName: '', addressLine1: '',
    addressLine2: '', city: '', pin: '',
    isSameAddress: true,
    agreedToTerms: true
  });
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    // 1. Define the base URL at the top of your file (outside the component)
const BASE_URL = "https://apidev-sdk.iserveu.online/NSDL";

const handleCreateUser = async () => {

  const [errors, setErrors] = useState({});
    try {
        // 1. Encrypt your formData
        const securePayload = encryptPayload(formData);

        if (!securePayload) {
            alert("Failed to encrypt data.");
            return;
        }

        const response = await fetch(`${BASE_URL}/user-onboarding/cbc-onboard`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'secretKey': 'a6T8tOCYiSzDTrcqPvCbJfy0wSQOVcfaevH0gtwCtoU=',
                'pass_Key': 'QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA'
            },
            // 2. Send the encrypted { RequestData: "..." } object
            body: JSON.stringify(securePayload),
        });

        const result = await response.json();

        // 3. Handle and Decrypt the response
        if (response.ok) {
            // If the backend returns an encrypted string in ResponseData
            const decryptedResult = result.ResponseData 
                ? decryptResponse(result.ResponseData) 
                : result;

            console.log("Decrypted Success:", decryptedResult);
            
            setShowModal(false);
            setShowSuccess(true); 
        } else {
            console.error("API Error Response:", result);
            alert("Failed to create user. Check console for details.");
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Network error. Please try again.");
    }
};

const validate = () => {
  let newErrors = {};

  if (step === 1) {
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Enter valid mobile number";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress))
      newErrors.emailAddress = "Enter valid email";

    if (!formData.city.trim()) newErrors.city = "City is required";

    if (!/^\d{6}$/.test(formData.pin))
      newErrors.pin = "Enter valid 6 digit PIN";
  }

  if (step === 2) {
    if (!formData.companyName?.trim())
      newErrors.companyName = "Company name required";

    if (!formData.gstNumber?.trim())
      newErrors.gstNumber = "GST number required";

    if (!formData.agreedToTerms)
      newErrors.agreedToTerms = "Please accept terms";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' };
  const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 30px' };
  const labelStyle = { display: 'block', color: '#666', fontSize: '14px' };

  return (
      <div style={{
          padding: '20px',   
          maxWidth: '1000px',
          margin: '0 auto'   
      }}>          <h1 style={{
              marginBottom: '30px',
              color: 'rgb(17, 3, 3)',
              fontWeight: 'bold'
          }}>
              Create CBC User
          </h1>      {/* STEP 1: Basic Info */}
      {step === 1 && (
        
        <form style={gridStyle}>
          {[
            { label: 'First Name', name: 'firstName' }, { label: 'Last Name', name: 'lastName' },
            { label: 'Username', name: 'username' }, { label: 'Mobile Number', name: 'mobileNumber' },
            { label: 'Email Address', name: 'emailAddress' }, { label: 'Admin Name', name: 'adminName' },
            { label: 'Address Line 1', name: 'addressLine1' }, { label: 'Address Line 2', name: 'addressLine2' },
            { label: 'City', name: 'city' }, { label: 'PIN', name: 'pin' },
          ].map(field => (
            <div key={field.name}>
              <label style={labelStyle}>{field.label}</label>
              <input name={field.name} placeholder={`Enter ${field.label}`} style={inputStyle} onChange={handleChange} />
            </div>
          ))}
        </form>
      )}

      {/* STEP 2: Full Detailed Form */}
      {step === 2 && (
        <div>
          <div style={gridStyle}>
            {['CEO Name', 'Company Name', 'PIN', 'Fax Number', 'Admin Name', 'Admin Email', 'Admin Mobile Number', 'Business Address Line 1', 'Business Address Line 2', 'Country', 'State', 'City', 'Account Number', 'GST Number', 'Telephone Number'].map(label => (
              <div key={label}><label style={labelStyle}>{label}</label><input style={inputStyle} placeholder={`Enter ${label}`} /></div>
            ))}
          </div>
          
          <div style={{...gridStyle, marginTop: '20px'}}>
            <div><label style={labelStyle}>Agreement To Date</label><input style={inputStyle} placeholder="DD/MM/YYYY" /></div>
            <div><label style={labelStyle}>Entity PAN Card</label><input style={inputStyle} placeholder="Enter PAN" /></div>
            {['Upload Bank Resolution', 'Upload Authorized Signatory KYC', 'Upload Certificate of Incorporation','Upload First Page Agreement','Upload last Page Agreement','Upload Business Proposal'].map(label => (
              <div key={label}>
                <label style={labelStyle}>{label}</label>
                <div style={{ ...inputStyle, background: '#fcfcfc', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>📎 {label} (.pdf only)</span><span>📥</span>
                </div>
              </div>
            ))}

            <div>
              <label style={labelStyle}>Product Features</label>
              <select style={inputStyle}>
                <option>Select Product Features</option>
                <option>AEPS</option>
                <option>DMT</option>
                <option>MATM</option>
                <option>Account Opening</option>
              </select>
            </div>
          </div>

          <div style={{ ...gridStyle, marginTop: '20px' }}>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" checked={formData.isSameAddress} onChange={(e) => setFormData({...formData, isSameAddress: e.target.checked})} style={{ accentColor: '#a00', marginRight: '10px' }} />
              <strong>Same as Business Address</strong>
            </div>
            {!formData.isSameAddress && ['Address Line 1', 'Country', 'State', 'City', 'PIN'].map(label => (
              <div key={label}><label style={labelStyle}>{label}</label><input style={inputStyle} /></div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#444', background: '#f9f9f9', padding: '15px', marginTop: '20px' }}>
            <input type="checkbox" checked={formData.agreedToTerms} onChange={(e) => setFormData({...formData, agreedToTerms: e.target.checked})} style={{ accentColor: '#a00' }} />
            <p style={{margin: 0}}>By using our services, you confirm that you are at least 18 years old and legally capable of entering into agreements. You are responsible for securing your account details and for any activity under your account... [Jurisdiction].</p>
          </div>
        </div>
      )}

      {/* FOOTER BUTTONS */}
      <div style={{ textAlign: 'right', marginTop: '40px' }}>
          {step === 2 && <button onClick={() => setStep(1)} style={{ marginRight: '20px', cursor: 'pointer', background: 'none', border: 'none', color: '#666' }}>Back</button>}
          <button
              type="button"
              onClick={() => {
                  if (step === 1) {
                      setStep(2);
                  } else {
                      setShowModal(true); // This will now work
                  }
              }}
              style={{ background: '#800000', color: 'white', border: 'none', padding: '10px 40px', borderRadius: '4px', cursor: 'pointer' }}
          >
              {step === 1 ? "Next" : "Save"}
          </button>
      </div>

      
      {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '450px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                  <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Are you sure you want to Create this User?</h3>
                  <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '30px' }}>
                      Please review all the entered details carefully before confirming, as creating this user will permanently add them to the system.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', alignItems: 'center' }}>
                      <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>NO</button>
                          <button
                              onClick={handleCreateUser} // Call the API here
                              style={{ background: '#800000', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '4px', cursor: 'pointer' }}
                          >
                              Yes Create
                          </button>

                  </div>
              </div>
          </div>
      )}

      {/* --- SUCCESS MODAL --- */}
          {showSuccess && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
                  <div style={{ background: 'white', padding: '40px', borderRadius: '8px', width: '400px', textAlign: 'center' }}>

                      {/* NSDL Logo Placeholder */}
                      <h3 style={{ color: '#a00', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                          <span style={{ color: '#f80' }}>●</span> NSDL Payments Bank
                      </h3>

                      {/* Green Success Circle */}
                      <div style={{ width: '80px', height: '80px', background: '#4cd137', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '8px solid #dff9fb' }}>
                          <span style={{ color: 'white', fontSize: '40px', fontWeight: 'bold' }}>✓</span>
                      </div>

                      <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '30px' }}>User Created Successfully!</p>

                      <button
                          onClick={() => setShowSuccess(false)}
                          style={{ width: '100%', background: '#4cd137', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                          Done
                      </button>
                  </div>
              </div>
          )}

    </div>
  );
};

export default CreateCBCUserForm;
