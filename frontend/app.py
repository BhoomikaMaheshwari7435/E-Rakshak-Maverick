import streamlit as st
from utils.translations import TEXT

if "language" not in st.session_state:
    st.session_state.language = "en"

t = TEXT[st.session_state.language]

st.set_page_config(
    page_title="E-Rakshak",
    page_icon="🛡️",
    layout="centered"
)

st.title(t["app_title"])
st.subheader(t["app_subtitle"])

st.markdown("---")

if st.button(t["scan"], use_container_width=True):
    st.switch_page("pages/scan.py")

if st.button(t["history"], use_container_width=True):
    st.switch_page("pages/history.py")

if st.button(t["emergency"], use_container_width=True):
    st.switch_page("pages/emergency.py")

if st.button(t["settings"], use_container_width=True):
    st.switch_page("pages/settings.py")


    st.divider()

st.caption(t["footer1"])
st.caption(t["footer2"])
st.caption(t["footer3"])