import streamlit as st


from utils.translations import TEXT

if "language" not in st.session_state:
    st.session_state.language = "en"

t = TEXT[st.session_state.language]


col1, col2 = st.columns([1, 5])

with col1:
    if st.button("⬅ Home"):
        st.switch_page("app.py")



st.set_page_config(page_title="Scan & Protect", page_icon="🛡️")

st.title(t["scan_title"])
st.write(t["scan_subtitle"])

st.markdown("---")

col1, col2 = st.columns(2)

with col1:
    if st.button("📩 SMS", use_container_width=True):
        st.session_state["scan_option"] = "SMS"

    if st.button("🔳 QR Scan", use_container_width=True):
        st.session_state["scan_option"] = "QR"

with col2:
    if st.button("💬 WhatsApp", use_container_width=True):
        st.session_state["scan_option"] = "WhatsApp"

    if st.button("🛡️ Protect & Analyze", use_container_width=True):
        st.session_state["scan_option"] = "Protect"

st.markdown("---")

option = st.session_state.get("scan_option", None)

# ---------------- SMS ----------------
# ---------------- SMS ----------------
if option == "SMS":
    st.subheader(t["sms_analysis"])

    sms = st.text_area(
        "Paste the SMS below",
        height=180,
        placeholder=t["sms_placeholder"]
    )

    if st.button(t["analyze_sms"], use_container_width=True):

        fake_response = {
            "success": True,
            "data": {
                "generatedAt": "30 Jul 2026 | 09:15 PM",

                "summary": {
                    "riskScore": 85,
                    "riskLevel": "HIGH RISK",
                    "category": "Government Scheme Fraud"
                },

                "details": {
                    "reasons": [
                        "Claims free government financial benefit.",
                        "Creates urgency to register immediately.",
                        "Requests Aadhaar and bank details.",
                        "Contains suspicious registration link."
                    ],

                    "safeNextStep":
                    "Verify the scheme only from official government websites. Never share Aadhaar, OTP or banking details."
                }
            }
        }

        report = fake_response["data"]

        st.success(t["analysis_done"])

        st.markdown("---")

        st.subheader(t["generated"])
        st.info(report["generatedAt"])

        st.markdown("---")

        st.subheader(t["summary"])

        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric(t["risk_score"], f'{report["summary"]["riskScore"]}/100')

        with col2:
            st.metric(t["risk_level"], report["summary"]["riskLevel"])

        with col3:
            st.metric(t["category"], report["summary"]["category"])

        st.markdown("---")

        st.subheader(t["reasons"])

        for reason in report["details"]["reasons"]:
            st.warning(reason)

        st.markdown("---")

        st.subheader("🛡 Safe Next Step")

        st.success(report["details"]["safeNextStep"])

# ---------------- WhatsApp ----------------
# ---------------- WhatsApp ----------------
elif option == "WhatsApp":
    st.subheader("💬 WhatsApp Scam Analysis")

    msg = st.text_area(
        "Paste WhatsApp Message",
        height=180,
        placeholder="Paste suspicious WhatsApp message..."
    )

    if st.button("🔍 Analyze WhatsApp", use_container_width=True):

        fake_response = {
            "success": True,
            "data": {
                "generatedAt": "30 Jul 2026 | 09:30 PM",

                "summary": {
                    "riskScore": 92,
                    "riskLevel": "HIGH RISK",
                    "category": "Investment Scam"
                },

                "details": {
                    "reasons": [
                        "Promises guaranteed high returns.",
                        "Creates urgency to invest immediately.",
                        "Requests payment through UPI.",
                        "Uses unofficial investment links."
                    ],

                    "safeNextStep":
                    "Never invest based on WhatsApp messages. Verify through official sources and avoid sending money to unknown accounts."
                }
            }
        }

        report = fake_response["data"]

        st.success("✅ Analysis Completed")

        st.markdown("---")

        st.subheader("📅 Generated At")
        st.info(report["generatedAt"])

        st.markdown("---")

        st.subheader("📊 Summary")

        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric("Risk Score", f'{report["summary"]["riskScore"]}/100')

        with col2:
            st.metric("Risk Level", report["summary"]["riskLevel"])

        with col3:
            st.metric("Category", report["summary"]["category"])

        st.markdown("---")

        st.subheader(t["reasons"])

        for reason in report["details"]["reasons"]:
            st.warning(reason)

        st.markdown("---")

        st.subheader(t["next_step"])

        st.success(report["details"]["safeNextStep"])

# ---------------- QR ----------------
# ---------------- QR ----------------
elif option == "QR":
    st.subheader("🔳 QR Scam Analysis")

    uploaded_qr = st.file_uploader(
        "Upload QR Code Image",
        type=["png", "jpg", "jpeg"]
    )

    if st.button("🔍 Analyze QR", use_container_width=True):

        fake_response = {
            "success": True,
            "data": {
                "generatedAt": "30 Jul 2026 | 09:45 PM",

                "summary": {
                    "riskScore": 96,
                    "riskLevel": "CRITICAL",
                    "category": "Fake Payment QR"
                },

                "details": {
                    "decodedLink": "https://pay-secure-verify.xyz",

                    "reasons": [
                        "QR redirects to an unofficial payment website.",
                        "Domain is not associated with any trusted payment provider.",
                        "Attempts to collect banking credentials.",
                        "Website uses misleading payment verification."
                    ],

                    "safeNextStep":
                    "Do not scan or make payments using unknown QR codes. Verify the merchant before proceeding."
                }
            }
        }

        report = fake_response["data"]

        st.success("✅ QR Analysis Completed")

        st.markdown("---")

        st.subheader("📅 Generated At")
        st.info(report["generatedAt"])

        st.markdown("---")

        st.subheader("🔗 Decoded QR Link")
        st.code(report["details"]["decodedLink"])

        st.markdown("---")

        st.subheader("📊 Summary")

        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric("Risk Score", f'{report["summary"]["riskScore"]}/100')

        with col2:
            st.metric("Risk Level", report["summary"]["riskLevel"])

        with col3:
            st.metric("Category", report["summary"]["category"])

        st.markdown("---")

        st.subheader("📝 Why is this Suspicious?")

        for reason in report["details"]["reasons"]:
            st.warning(reason)

        st.markdown("---")

        st.subheader("🛡 Safe Next Step")

        st.success(report["details"]["safeNextStep"])

# ---------------- Protect ----------------
# ---------------- Protect ----------------
elif option == "Protect":

    st.subheader("🎙 Call Recording Analysis")

    uploaded_audio = st.file_uploader(
        "Upload Call Recording",
        type=["mp3", "wav", "mpeg"]
    )

    if st.button("🔍 Analyze Call", use_container_width=True):

        fake_response = {
            "success": True,
            "data": {

                "transcript":
                "Hello ma'am, can you please give me the recent OTP for your bank account? Your KYC verification is pending. If you do not verify within the next 10 minutes, your account will be blocked.",

                "report": {

                    "generatedAt": "30 Jul 2026 | 10:05 PM",

                    "summary": {
                        "riskScore": 97,
                        "riskLevel": "CRITICAL",
                        "category": "Bank Impersonation Scam"
                    },

                    "details": {

                        "reasons": [
                            "Caller asks for OTP.",
                            "Mentions bank account verification.",
                            "Creates urgency by threatening account suspension.",
                            "Attempts to obtain confidential banking information."
                        ],

                        "safeNextStep":
                        "Hang up immediately. Never share OTP, PIN or banking credentials over a phone call. Contact your bank using its official customer care number."
                    }

                }

            }
        }

        data = fake_response["data"]
        report = data["report"]

        st.success("✅ Call Analysis Completed")

        st.markdown("---")

        st.subheader("📝 Transcript")

        st.info(data["transcript"])

        st.markdown("---")

        st.subheader("📅 Generated At")

        st.info(report["generatedAt"])

        st.markdown("---")

        st.subheader("📊 Summary")

        c1, c2, c3 = st.columns(3)

        with c1:
            st.metric("Risk Score", f'{report["summary"]["riskScore"]}/100')

        with c2:
            st.metric("Risk Level", report["summary"]["riskLevel"])

        with c3:
            st.metric("Category", report["summary"]["category"])

        st.markdown("---")

        st.subheader("⚠ Why is this Suspicious?")

        for reason in report["details"]["reasons"]:
            st.warning(reason)

        st.markdown("---")

        st.subheader("🛡 Safe Next Step")

        st.success(report["details"]["safeNextStep"])

    st.divider()

   