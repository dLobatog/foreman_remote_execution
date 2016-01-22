module JobInvocationsChartHelper
  def job_invocation_chart(invocation)
    donut_chart('#status_chart',
                job_invocation_data(invocation)[:columns],
                job_invocation_data(invocation)[:groups])
  end

  def job_invocation_data(invocation)
    success = job_invocation_success_count(invocation)
    cancelled = job_invocation_cancelled_count(invocation)
    failed = job_invocation_failed_count(invocation)
    pending = job_invocation_pending_count(invocation)
    columns = [[_('Success'), success],
               [_('Failed'), failed],
               [_('Pending'), pending],
               [_('Cancelled'), cancelled]]
    groups = [columns.map(&:first)]

    { :columns => columns, :groups => groups}
  end

  def job_invocation_status(invocation)
    case invocation.status
      when HostStatus::ExecutionStatus::QUEUED
        _('queued')
      when HostStatus::ExecutionStatus::RUNNING
        _('running %s%') % invocation.progress
      when HostStatus::ExecutionStatus::OK
        _('succeeded')
      when HostStatus::ExecutionStatus::ERROR
        _('failed')
      else
        _('unknown status')
      end
  end

  def job_invocation_success_status
    icon_text('ok',
              "#{job_invocation_success_count(@job_invocation)}",
              :kind => 'pficon')
  end

  def job_invocation_failed_status
    icon_text('error-circle-o',
              "#{job_invocation_failed_count(@job_invocation)}",
              :kind => 'pficon')
  end

  def job_invocation_pending_status
    icon_text('running',
              "#{job_invocation_pending_count(@job_invocation)}",
              :kind => 'pficon')
  end
  def job_invocation_cancelled_status
    icon_text('close',
              "#{job_invocation_cancelled_count(@job_invocation)}",
              :kind => 'pficon')
  end
end
