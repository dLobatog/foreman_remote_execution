module ForemanRemoteExecution
  module SubnetExtensions
    extend ActiveSupport::Concern

    included do
      has_many :target_remote_execution_proxies, :as => :target
      has_many :remote_execution_proxies, :dependent => :destroy, :through => :target_remote_execution_proxies
      attr_accessible :remote_execution_proxies, :remote_execution_proxy_ids
    end
  end
end
