import streamlit as st
from utils.translations import TEXT

# ---------------- Language ----------------
if "language" not in st.session_state:
    st.session_state.language = "en"

t = TEXT[st.session_state.language]

# ---------------- Back Button ----------------
col1, col2 = st.columns([1, 5])

with col1:
    if st.button(t["home"]):
        st.switch_page("app.py")

st.title("📜 " + t["history"])

st.divider()

history = [

    {
        "type": "📩 SMS",
        "category": "Government Scheme Fraud",
        "risk": 85,
        "level": "HIGH",
        "time": "Today • 9:13 PM"
    },

    {
        "type": "💬 WhatsApp",
        "category": "Investment Scam",
        "risk": 92,
        "level": "HIGH",
        "time": "Today • 9:14 PM"
    },

    {
        "type": "🔳 QR Code",
        "category": "Fake Payment QR",
        "risk": 96,
        "level": "CRITICAL",
        "time": "Today • 9:16 PM"
    },
    {
        "type": "🎙 Call Recording",
        "category": "Bank Impersonation Scam",
        "risk": 97,
        "level": "CRITICAL",
        "time": "Today • 9:18 PM"
    }

]

for item in history:

    with st.container(border=True):

        st.subheader(item["type"])

        st.write("🕒", item["time"])

        st.write(f"**{t['category']}:**", item["category"])

        st.write(f"**{t['risk_score']}:**", f'{item["risk"]}/100')

        st.write(f"**{t['risk_level']}:**", item["level"])

st.divider()

st.caption(t["footer1"])
st.caption(t["footer2"])
st.caption(t["footer3"])