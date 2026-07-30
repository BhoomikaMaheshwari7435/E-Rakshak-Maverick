import streamlit as st

st.set_page_config(
    page_title="Scan & Protect",
    page_icon="🛡️",
    layout="wide"
)

st.title("🛡️ Scan & Protect")

if st.button("⬅ Back"):
    st.switch_page("app.py")

st.markdown("---")

st.button("📩 Scan SMS", use_container_width=True)

st.button("💬 Scan WhatsApp", use_container_width=True)

st.button("🔗 Scan QR", use_container_width=True)

st.button("📄 Scan File", use_container_width=True)