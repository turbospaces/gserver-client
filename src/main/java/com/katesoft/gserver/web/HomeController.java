package com.katesoft.gserver.web;

import com.katesoft.gserver.repo.UserAccountRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

@Controller
public class HomeController {
    UserAccountRepository userAccountRepository;

    @RequestMapping("/")
    public ModelAndView home() {
        ModelAndView mv = new ModelAndView("home");
        //model.addAttribute("connectionsToProviders", getConnectionRepository().findAllConnections());
        //model.addAttribute(accountRepository.findAccountByUsername(currentUser.getName()));
        return mv;
    }
}

