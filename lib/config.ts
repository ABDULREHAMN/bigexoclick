// Application configuration - Controls visibility of UI elements, alerts, and system messages
export const config = {
  notifications: {
    enabled: false,
  },
  kyc_section: {
    visible: false,
    show_status: false,
    show_documents: false,
    show_upload_link: false,
    show_pending_message: false,
  },
  support_section: {
    visible: false,
    show_email: false,
    show_website: false,
    show_response_time: false,
  },
  payment_section: {
    show_notifications: false,
    show_recent_activity: false,
    show_payment_status: false,
  },
  withdrawals: {
    hold_message: false,
    warning_message: false,
    auto_process_notice: false,
  },
  activity_log: {
    visible: false,
  },
  alerts: {
    enabled: false,
  },
  dashboard: {
    hide_next_withdraw_section: true,
  },
  ui: {
    banners: false,
    popups: false,
    info_boxes: false,
    status_cards: false,
  },
  system_messages: {
    show_all: false,
  },
};

export default config;
