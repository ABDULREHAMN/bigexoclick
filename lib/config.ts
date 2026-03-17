// Application configuration
export const config = {
  notifications: {
    enabled: false,
  },
  payment_section: {
    show_notifications: false,
    show_recent_activity: false,
    show_kyc_status: false,
    show_payment_status: false,
  },
  kyc: {
    required: false,
    show_message: false,
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
  ui: {
    banners: false,
    popups: false,
    status_boxes: false,
  },
  security_notes: {
    show: false,
  },
};

export default config;
