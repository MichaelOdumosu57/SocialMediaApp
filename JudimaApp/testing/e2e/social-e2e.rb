# require %{em/pure_ruby}
require %{capybara}
require %{capybara/dsl}
require %{capybara/rspec}
require %{capybara/rspec/matcher_proxies}
require %{rspec/expectations}
require %{rails_helper}
require %{percy}
require %{selenium/webdriver}
require %{selenium-webdriver}
require %{net/http}
require %{rest-client}
require %{json}
require %{pp}
require %{uri}
require %{billy/capybara/rspec}
# load  %{testmod.rb}


# dev additions
require %{rotp}
require %{mailslurp_client}
require %{table_print}
#



# dev setup

class Capybara::Node::Element
  def select_option(wait: nil)
    begin
      raise 's'
        rescue => exception
      scroll_to self
      synchronize(wait) { base.click }
      self
    end
  end
end
# Selenium::WebDriver.logger.level = :debug
# Selenium::WebDriver.logger.output = %{selenium.log}
Capybara.raise_server_errors = false
Capybara.run_server = false
Capybara.default_max_wait_time = 5
Capybara.ignore_hidden_elements = false
Capybara.javascript_driver = :selenium_chrome_billy


Selenium::WebDriver::Firefox::Binary.path = %{C://Users//Restop-2345//unneeded//Mozilla Firefox//firefox.exe}
Selenium::WebDriver::Firefox::Service.driver_path=%{/mnt/c/Users/Restop-2345/unneeded/ruby/geckodriver.exe}
Selenium::WebDriver::Chrome::Service.driver_path=%{/mnt/c/Users/Restop-2345/unneeded/ruby/chromedriver.exe}
$client = nil

# dev additions
$accounts = Hash[
  :firefox_billy => Hash[

    :inbox_string => %{1aa8ba75-396b-4e72-8ea5-bcdda6fc4975},
    :pass => %{Turkey123456},
    :change_pass => %{123456Turkey},
    :access_token => nil,
    :totp => nil
  ],
  :chrome_billy => Hash[

    :inbox_string => %{f226595d-3904-488f-87a8-d5ed7ffd709e},
    :pass => %{Apples123456},
    :change_pass => %{123456Apples},
    :access_token => nil,
    :totp => nil
  ]
]
#

Capybara.register_driver :internetExplorer do |app|

	Capybara::Selenium::Driver.new(
		app,
		:browser => :internet_explorer,
		:options =>   Selenium::WebDriver::IE::Options.new({
		:ignore_zoom_levels => true,
		:ignore_zoom_setting => true,
		# :browser_attach_timeout => 1,
		:javascript_enabled => true,
		:persistent_hover => true,
		# :require_window_focus => true,
		:ignore_protected_mode_settings =>true,
		:ignore_zoom_level => false
			})
	)

end

Capybara.register_driver :chrome_billy do |app|

  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument %{--ignore-certificate-errors}
  options.add_argument %{--proxy-server=#{Billy.proxy.host}:#{Billy.proxy.port}}
  options.add_argument " --proxy-bypass-list=<-loopback>" # New argument here to ensure requests to localhost are sent to Puffing Billy's proxy

	Capybara::Selenium::Driver.new(
		app,
		:browser => :chrome,
    :options => options,
    :clear_local_storage => true,
    :clear_session_storage => true
	)
end

Capybara.register_driver :firefox_profile do |app|
	desired_caps = Selenium::WebDriver::Remote::Capabilities.firefox
	# desired_caps[:firefox_profile] = %{file:///C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
	# desired_caps[:firefox_profile] = %{C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
	# desired_caps[:firefox_profile] = %{capybara}
	# service = Selenium::WebDriver::Service.firefox :args => [%{-vv}]
	# options = Selenium::WebDriver::Firefox::Options.new :args => [%{-profile=C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}]
	# options.profile = Selenium::WebDriver::Firefox::Profile.new %{C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}

	# options.log_level = %{debug}
	Capybara::Selenium::Driver.new(
			app,
			:browser => :ff,
			:desired_capabilities => desired_caps,
			# :options =>   options,
			# :service => service
	)

end


Capybara.register_driver :firefox_billy do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new %{firefox/profiles/capybara}
  profile.assume_untrusted_certificate_issuer = false
  profile.proxy = Selenium::WebDriver::Proxy.new(
    http: "#{Billy.proxy.host}:#{Billy.proxy.port}",
    ssl: "#{Billy.proxy.host}:#{Billy.proxy.port}")


  options  =  Selenium::WebDriver::Firefox::Options.new(:profile => profile)
  capabilities = Selenium::WebDriver::Remote::Capabilities.firefox(:accept_insecure_certs => true)
  Capybara::Selenium::Driver.new(
    app,
    options: options,
    desired_capabilities: capabilities
  )



end

Capybara.register_driver :edgeBrowser do |app|


	Capybara::Selenium::Driver.new(
			app,
			:browser => :edge,
			:desired_capabilities =>Selenium::WebDriver::Remote::Capabilities::edge({
		:javascript_enabled => true,
		:css_selectors_enabled => true,
			}),
	)

end

Capybara.register_driver :operaDriver do |app|

	Capybara::Selenium::Driver.new(
			app,
			:browser => :opera,
			:desired_capabilities =>Selenium::WebDriver::Remote::Capabilities::edge({
        :javascript_enabled => true,
        :css_selectors_enabled => true,
			}),
	)

end

# Mailslurp configuration
MailSlurpClient.configure do |config|
  api_key = ENV[%{MAILSLURP_API_KEY}]
  if api_key == %{} or api_key == nil then
    raise %{No API_KEY environment variable set for MailSlurp API KEY}
  end
  config.api_key[%{x-api-key}] = api_key
end

$inbox_controller = MailSlurpClient::InboxControllerApi.new
$wait_controller = MailSlurpClient::WaitForControllerApi.new
#

# RSpec configs
RSpec.configure do |config|


	# my_drivers = %i{ edgeBrowser internetExplorer selenium }
	# my_drivers = %i{ edgeBrowser }
	# my_drivers = %i{ selenium_billy }
	# my_drivers = %i{ selenium}
	my_drivers = %i{firefox_billy chrome_billy}
  # my_drivers = %i{chrome_billy}
	# my_drivers = %i{ internetExplorer }
	hosts = Hash.new
	hosts[:dev] =  %{http://localhost:4521}

	config.full_backtrace = false
	config.backtrace_exclusion_patterns = [
			/\/lib\d*\/ruby\//,
			/bin\//,
			/gems/,
			/spec\/spec_helper\.rb/,
			/lib\/rspec\/(core|expectations|matchers|mocks)/
	]

  config.before :example do

    visit %{/}
    page.execute_script %Q{
      window.judima_environment.dev.createAccount.dummy = false
      window.judima_environment.dev.confCode.dummy = false
      window.judima_environment.dev.totpCreateAccount.dummy = false
      window.judima_environment.dev.totpSignIn.dummy = false
      window.judima_environment.dev.passSignIn.dummy = false
      window.judima_environment.dev.passChange.dummy = false
      window.judima_environment.dev.deleteSignIn.dummy = false
    }
    begin
      page.current_window.maximize
    rescue
      nil
    end

    # dev additions

    #
    sleep 5



  end

  config.after :example do

    # dev additions
    # log out the user
    my_drivers.each do |browser|

      # apply the actual inbox to the browser
      $accounts[browser.to_sym][:inbox] = $inbox_controller.get_inbox $accounts[browser.to_sym][:inbox_string]
      inbox = $accounts[browser.to_sym][:inbox]
      #
      payload = Hash[
        :env =>%{adminSignOutUser},
        :user => inbox.email_address,
        :access_token =>$access_token
      ]
      # PP.pp payload
      headers = Hash[:Origin => %{http:localhost:4521},:Content_Type => %{application/json}]
      begin
        RestClient.post("http://localhost:3005", payload=payload.to_json, headers=headers)
      rescue => exception
        nil
      end

    end
    #
    #

  end

  config.around do |example|
      $example  = example
      my_drivers.each do |browser|
        Capybara.current_driver = browser

        # apply the actual inbox to the browser
        $accounts[browser.to_sym][:inbox] = $inbox_controller.get_inbox $accounts[browser.to_sym][:inbox_string]
        #

        hosts.each do |k,v|
          Capybara.current_driver = browser
          Capybara.app_host = v
          # A Identifying and running each scenario
            # PP.pp example.metadata
          p Capybara.app_host.to_s +  %{ in } + Capybara.current_driver.to_s
          p %{scenario #{example.metadata[:description]}}
          begin
            example.run
          rescue => exception
            page.driver.quit
          end
          # A
        end
      end
  end

  config.before :suite do
      # dev additions
      # delete the user from the user pool if they are still there

      my_drivers.each do |browser|

        # apply the actual inbox to the browser
        $accounts[browser.to_sym][:inbox] = $inbox_controller.get_inbox $accounts[browser.to_sym][:inbox_string]
        inbox = $accounts[browser.to_sym][:inbox]
        #

        payload = Hash[:env =>%{adminDeleteAcct},:user => inbox.email_address]
        headers = Hash[:Origin => %{http:localhost:4521},:Content_Type => %{application/json}]
        begin
          RestClient.post("http://localhost:3005", payload=payload.to_json, headers=headers)
        rescue => exception
          nil
        end

      end

      #
  end

  config.after :suite do
      system %{takill /IM MicrosoftEdge.exe -F}
      system %{taskkill /IM MicrosoftWebDrivers.exe}



  end
end
#


# puffing billy configuration
Billy.configure do |c|

  # c.cache = true
  c.proxy_port = 64190
  c.record_requests = true
  # c.whitelist << %{localhost:4521}# to append a host without overriding the defaults.
  # c.whitelist << %{127.0.0.1:4521}
  c.whitelist << %{localhost:3005}
  c.whitelist << %{127.0.0.1:3005}
  c.logger = nil
  c.persist_cache = true

  # pp c

end
#


def stagingTest
@javascript
  RSpec.feature  %{misc}, :skip => true do

		scenario %{check that puffing billy is working}  do
      my_response = []
      my_proc = Proc.new do |*args|
        response = Billy.pass_request(*args)
        my_response << r
        PP.pp response
      end
      proxy.stub('http://localhost:4521/').and_return(my_proc)
      sleep 10
      expect(my_response.size).not_to eq 0
      # PP.pp Billy.proxy.requests
    end

  end

  RSpec.feature  %{navigation}  do
    scenario %{as you click on navigation the elements highlight the navs should highlight} do
      navs = all %{.a_p_p_MenuItem}
      navs.each do |x|
        x.click
        sleep 3
        highlighted = x.style %{font-family}
        expect(highlighted[%{font-family}]).to eq(%{Arial})

      end
    end
  end




	RSpec.feature %{account login}  do


    scenario %{create acct}   do

      # init
      accounts = $accounts[Capybara.current_driver.to_sym]
      inbox = accounts[:inbox]
      wait_controller = $wait_controller
      #

      # stub the backend
      post_backend_response = Hash.new
      my_proc = Proc.new do |*args|
        response = Billy.pass_request(*args)

        response_body = JSON.parse response[:body]
        unless response_body[%{QR_code}]== nil
          post_backend_response[:qr_code] = response_body
        end
        unless response_body[%{access_token}]== nil
          post_backend_response[:access_token] = response_body
        end
        response
      end
      proxy.stub(%{http://localhost:3005/}, method: %{post}).and_return my_proc
      #

      navs = all %{.a_p_p_MenuItem}
      account_login = navs.at 1
      account_login.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 12
      end


      create_account = first %{.a_p_p_LoginCreateButton}
      create_account.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 6
      end

      # create an account
      email_input = first %{.f_o_r_m_email}
      pass_input  = first %{.f_o_r_m_password}
      confirm_pass_input = first %{.f_o_r_m_confirmPassword}
      submit_new_creds   = first %{.a_p_p_LoginCreateOneButton}
      email_input.fill_in :with => inbox.email_address
      pass_input.fill_in  :with => accounts[:pass]
      confirm_pass_input.fill_in :with => accounts[:pass]
      submit_new_creds.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 5
      else
        sleep 10
      end

      # grab the confirmation code
      email = wait_controller.wait_for_latest_email({ inbox_id: inbox.id, unread_only: true, timeout: 30_000 })
      expect(email.subject).to include %{Your verification code}
      match = email.body.match /code is ([0-9]{6})/
      if match == nil then
        raise %{Could not find match in body #{email.body}}
      end
      conf_code, * = match.captures
      expect(conf_code).to be_truthy
      #

      # submit the conf code for the next step
      conf_code_input  = first %{.a_p_p_LoginCreateFourInput}
      conf_code_submit = first %{.a_p_p_LoginCreateFourButton}
      conf_code_input.fill_in :with => conf_code
      conf_code_submit.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 5
      else
        sleep 10
      end

      # get the qr code form the puffing billy proxy
      my_QR_code = nil
      unless post_backend_response[:qr_code] == nil
        qr_response = post_backend_response[:qr_code]
        my_QR_code= qr_response[%{QR_code}]
      else
        my_QR_code = evaluate_script %{return window.judima_environment.QRcode}
      end
      PP.pp post_backend_response
      accounts[:totp]= ROTP::TOTP.new my_QR_code, :issuer => %{socialSpace}
      accounts[:totp].provisioning_uri inbox.email_address
      #

      # enter the TOTP
      my_QR_input = first %{.a_p_p_LoginCreateTwoInput}
      my_QR_submit = first %{.a_p_p_LoginCreateTwoButton}
      my_QR_input.fill_in :with => accounts[:totp].now
      my_QR_submit.click
      account_created_sucess = first %{.a_p_p_LoginCreateThreeTitle}
      expect(account_created_sucess.text).to include %{Account Sucessfully Created}
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 5
      else
        sleep 10
      end
      #

      # hold on to the access token
      unless post_backend_response[:access_token] == nil
        accounts[:access_token] = post_backend_response[:access_token][%{access_token}]
      else
        accounts[:access_token] = evaluate_script %{return window.judima_environment.QRcode}
      end
      #

    end

    scenario %{sign In} do


      # init
      accounts = $accounts[Capybara.current_driver.to_sym]
      inbox = accounts[:inbox]
      #

      # get to the account login page
      navs = all %{.a_p_p_MenuItem}
      account_login = navs.at 1
      account_login.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 12
      end
      #

      # get to the user sign in page
      sign_in_button = first %{.a_p_p_LoginSignInButton}
      sign_in_button.click
      #

      # fill out credential info
      sleep 27
      creds = all %{.a_p_p_LoginSignInOneInput}
      sign_in = first %{.a_p_p_LoginSignInOneButton}
      user = creds.at 0
      pass = creds.at 1
      my_totp= creds.at 2

      user.fill_in :with => inbox.email_address
      pass.fill_in :with => accounts[:pass]
      my_totp.fill_in :with => accounts[:totp].now
      sign_in.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 6
      end

      confirmation =first %{.a_p_p_LoginSignInTwoTitle}
      expect(confirmation.text).to include %{Thank you for Signing In}
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 5
      else
        sleep 10
      end

    end

    scenario %{change password}   do

      # init
      accounts = $accounts[Capybara.current_driver.to_sym]
      inbox = accounts[:inbox]
      wait_controller = $wait_controller
      #

      # get to the account login page
      navs = all %{.a_p_p_MenuItem}
      account_login = navs.at 1
      account_login.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 12
      end
      #

      # get to the user sign in page
      password_in_button = first %{.a_p_p_LoginPasswordButton}
      password_in_button.click
      #

      # fill out credential info
        # sleep 30 to allow the software token to change
      sleep 20
      creds = all %{.a_p_p_LoginPasswordOneInput}
      change_pass = first %{.a_p_p_LoginPasswordOneButton}
      user = creds.at 0
      pass = creds.at 1
      my_totp= creds.at 2
      user.fill_in :with => inbox.email_address
      pass.fill_in :with => accounts[:pass]
      my_totp.fill_in :with => accounts[:totp].now
      change_pass.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 6
      end
      #

      # update with new password
      passwords = all %{.a_p_p_LoginPasswordTwoInput}
      change_pass = first %{.a_p_p_LoginPasswordTwoButton}
      old_pass =     passwords.at 0
      new_pass =     passwords.at 1
      confirm_pass = passwords.at 2

      old_pass.fill_in :with => accounts[:pass]
      new_pass.fill_in :with => accounts[:change_pass]
      confirm_pass.fill_in :with => accounts[:change_pass]
      change_pass.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 6
      end
      confirmation = first %{.a_p_p_LoginPasswordThreeTitle}
      expect(confirmation.text).to eq %{Password Updated Sucesfully}
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 5
      else
        sleep 10
      end

    end

    scenario %{dont delete the account!!:/)}   do

      # init
      accounts = $accounts[Capybara.current_driver.to_sym]
      inbox = accounts[:inbox]
      wait_controller = $wait_controller
      #

      # get to the delete account
      navs = all %{.a_p_p_MenuItem}
      account_login = navs.at 1
      account_login.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 15
      end
      #

      # get to the user delete page
        # allow the component to load
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 5
      else
        sleep 30
      end
      delete_button = first %{.a_p_p_LoginDeleteButton}
      delete_button.click
      #

      # fill out credential info
        # sleep 20 so the TOTP can reset
      sleep 20
      delete = all %{.a_p_p_LoginDeleteOneComponentInput}
      delete_sign_in = first %{.a_p_p_LoginDeleteOneComponentButton}
      user =   delete.at 0
      pass =   delete.at 1
      my_totp= delete.at 2
      user.fill_in :with => inbox.email_address
      pass.fill_in :with => accounts[:change_pass]
      my_totp.fill_in :with => accounts[:totp].now
      delete_sign_in.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 6
      end
      #

      # end user wants to turn back at the last moment
      cancel_delete = first %{.a_p_p_LoginDeleteTwoComponentButton}
      cancel_delete.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 6
      end
      main_cointainer = Hash[
        :element => (first %{.a_p_p_LoginContainer}),
        :target_style => nil
      ]
      main_cointainer[:target_style] = main_cointainer[:element].style %{z-index}
      expect(main_cointainer[:target_style][%{z-index}]).to eq %{5}
      #

      # sign in to make sure the acct still exists
      # get to the user sign in page
      sign_in_button = first %{.a_p_p_LoginSignInButton}
      sign_in_button.click
      #

      # fill out credential info
      sleep 27
      creds = all %{.a_p_p_LoginSignInOneInput}
      sign_in = first %{.a_p_p_LoginSignInOneButton}
      user = creds.at 0
      pass = creds.at 1
      my_totp= creds.at 2

      user.fill_in :with => inbox.email_address
      pass.fill_in :with => accounts[:change_pass]
      my_totp.fill_in :with => accounts[:totp].now
      sign_in.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 6
      end

      confirmation =first %{.a_p_p_LoginSignInTwoTitle}
      expect(confirmation.text).to include %{Thank you for Signing In}
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 5
      else
        sleep 10
      end
      #
      #


    end

    scenario %{delete account}   do


      # init
      accounts = $accounts[Capybara.current_driver.to_sym]
      inbox = accounts[:inbox]
      #

      # get to the delete account
      navs = all %{.a_p_p_MenuItem}
      account_login = navs.at 1
      account_login.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 15
      end
      #

      # get to the user delete page
        # allow the component to load
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 5
      else
        sleep 30
      end
      delete_button = first %{.a_p_p_LoginDeleteButton}
      delete_button.click
      #

      # fill out credential info
        # sleep 20 so the TOTP can reset
      sleep 20
      delete = all %{.a_p_p_LoginDeleteOneComponentInput}
      delete_sign_in = first %{.a_p_p_LoginDeleteOneComponentButton}
      user =   delete.at 0
      pass =   delete.at 1
      my_totp= delete.at 2
      user.fill_in :with => inbox.email_address
      pass.fill_in :with => accounts[:change_pass]
      my_totp.fill_in :with => accounts[:totp].now
      delete_sign_in.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 6
      end
      #

      # end user is sure they want to delete their acct
      confirm_delete = first %{.a_p_p_LoginDeleteTwoComponentButtonDanger}
      confirm_delete.click
      unless Capybara.current_driver.to_sym == %{selenium_billy}
        sleep 3
      else
        sleep 6
      end
      confirmation = first %{.a_p_p_LoginDeleteThreeComponentTitle}
      expect(confirmation.text).to eq %{Account Sucessfully Deleted}
      #



    end

	end

  RSpec.feature  %{staging}, :skip => true do



  end

end


def dropdownSelectSelector
	(all %{.a_p_p_DropDownMiddle})
	.to_a
	.select! do |x|
		x.text == %{Select Item}
	end
end
def navigationPage
	(all %{*})
	.to_a
	.select! do |x|
		unless x[:class] == nil
			!(x[:class].include? %{main-navigation})
		else
			true
		end
	end
	.collect! do |x|
		x.style %{top},%{left}
	end

end

def numberParse  devObj
    dimension = devObj[:dimension]
    (dimension.split %{px}).at 0
end

def media_query devObj
	begin
		page.current_window.resize_to devObj[:width], 800
	rescue => e
		execute_script %Q{
			resizeTo(#{devObj[:width]},800)
		}
	end
end


def capybara_result_to_array devObj
	arr = []
	devObj[:target]
	.each do |x|
		arr.push x
	end
	arr
end
stagingTest
