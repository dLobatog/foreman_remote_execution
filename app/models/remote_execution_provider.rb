class RemoteExecutionProvider
  class << self
    def provider_for(type)
      providers[type.to_s] || providers[:SSH]
    end

    def providers
      @providers ||= { }.with_indifferent_access
    end

    def register(key, klass)
      providers[key.to_sym] = klass
    end

    def provider_names
      providers.keys.map(&:to_s)
    end

    def proxy_command_options(template_invocation, host)
      {}
    end

    def humanized_name
      self.name
    end

    def supports_effective_user?
      false
    end

    def effective_interfaces(host)
      interfaces = []
      %w(execution primary provision).map do |flag|
        interfaces << host.send(flag + '_interface')
      end
      interfaces.compact.uniq
    end

    def find_ip_or_hostname(host)
      interfaces = effective_interfaces(host)
      if host_setting(host, :remote_execution_connect_by_ip)
        ip_interface = interfaces.find { |i| i.ip.present? }
      end
      if ip_interface
        ip_interface.ip
      else
        fqdn_interface = interfaces.find { |i| i.fqdn.present? }
        if fqdn_interface
          fqdn_interface.fqdn
        else
          raise _('Could not find any suitable interface for execution')
        end
      end

      def host_setting(host, setting)
        host.params[setting.to_s] || Setting[setting]
      end
    end
  end
end
