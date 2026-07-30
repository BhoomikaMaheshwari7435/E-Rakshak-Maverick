import streamlit as st

st.set_page_config(
    page_title="E-Rakshak",
    page_icon="🛡️",
    layout="centered"
)

# ---------------- Navigation ----------------

if "page" not in st.session_state:
    st.session_state.page = "home"

# ---------------- HOME ----------------

if st.session_state.page == "home":

    st.title("🛡️ E-Rakshak")

    st.markdown("---")

    if st.button("🛡️ Scan & Protect", use_container_width=True):
        st.session_state.page = "scan"
        st.rerun()

    st.write("")

    if st.button("📜 History", use_container_width=True):
        st.write("Coming Soon")

    st.write("")

    if st.button("🚨 Emergency Help", use_container_width=True):
        st.write("Coming Soon")

    st.write("")

    if st.button("⚙️ Settings", use_container_width=True):
        st.write("Coming Soon")

# ---------------- SCAN PAGE ----------------

elif st.session_state.page == "scan":

    st.title("🛡️ Scan & Protect")

    if st.button("⬅ Back"):
        st.session_state.page = "home"
        st.rerun()

    st.markdown("---")

    st.button("📩 Scan SMS", use_container_width=True)

    st.button("💬 Scan WhatsApp", use_container_width=True)

    st.button("🔗 Scan QR", use_container_width=True)

    st.button("📄 Scan File", use_container_width=True)